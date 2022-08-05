import { defineComponent, onMounted, onBeforeUnmount, h, normalizeClass } from 'vue'
import { shallowRef, ref, computed, readonly, watch, toRaw, DeepReadonly, PropType } from 'vue'
import { createPlayer, createPlayerState, propKeys } from '../../../player'
import { PlayerState, PlayerResult } from '../../../player'
import { normalizedProps, normalizedEvents, bindPropUpdateEvent } from './helper'

const MOUNTED_EVENT_NAME = 'mounted'
const UNMOUNTED_EVENT_NAME = 'unmounted'

export default defineComponent({
  name: 'VueVideoPlayer',
  props: { ...normalizedProps, class: [String, Object, Array] as PropType<unknown> },
  emits: [...normalizedEvents, MOUNTED_EVENT_NAME, UNMOUNTED_EVENT_NAME],
  // https://github.com/vuejs/rfcs/pull/192
  // https://github.com/vuejs/core/pull/2693
  // slots: Object as () => { player: VideoJsPlayer; state: DeepReadonly<PlayerState> },
  setup(props, context) {
    const mounted = shallowRef(false)
    const videoElement = shallowRef<HTMLVideoElement | null>(null)
    const playerResult = shallowRef<PlayerResult | null>(null)
    const videoJsPlayer = computed(() => {
      return playerResult.value ? playerResult.value.player : null
    })

    const state = ref<PlayerState | null>(null)
    const readOnlyState = computed<DeepReadonly<PlayerState> | null>(() => {
      return state.value ? readonly(state.value) : null
    })

    onMounted(() => {
      // create player
      const { class: _, ...rawProps } = toRaw(props)
      const playerRes = createPlayer({
        element: videoElement.value!,
        props: rawProps,
        onEvent: context.emit
      })

      // Sync Video.js config change to update:prop event.
      bindPropUpdateEvent({
        player: playerRes.player,
        onEvent: context.emit
      })

      // Sync Vue class name to Video.js container.
      watch(
        () => props.class,
        (newClassName, oldClassName) => {
          const ocn = normalizeClass(oldClassName)
          const ncn = normalizeClass(newClassName)
          playerRes.updateClassNames(ocn, ncn)
        },
        { immediate: true }
      )

      // Sync fallback options to Video.js config.
      watch(
        () => props.options,
        (newOptions) => playerRes.updateOptions(newOptions ?? {}),
        { deep: true }
      )

      // Sync component props to Video.js config.
      propKeys
        .filter((key) => key !== 'options')
        .forEach((key) => {
          watch(
            () => props[key],
            (newValue) => playerRes.updatePropOption(key, newValue),
            { deep: true }
          )
        })

      // create player state
      createPlayerState(playerRes.player, {
        onInit(initState) {
          state.value = initState
        },
        onUpdate(key, value) {
          if (state.value) {
            state.value[key] = value
          }
        }
      })

      // emit mounted event
      playerResult.value = playerRes
      mounted.value = true
      context.emit(MOUNTED_EVENT_NAME, {
        video: videoElement.value,
        player: videoJsPlayer.value,
        state: readOnlyState.value
      })
    })

    onBeforeUnmount(() => {
      if (playerResult.value) {
        playerResult.value.dispose()
        playerResult.value = null
        state.value = null
        context.emit(UNMOUNTED_EVENT_NAME)
      }
    })

    return () => {
      // https://videojs.com/guides/embeds/
      // https://videojs.com/guides/react/
      return h('div', { 'data-vjs-player': '' }, [
        h('video', {
          class: ['video-js', 'v-video-player'],
          ref: videoElement
        }),
        mounted.value &&
          context.slots.default?.({
            video: videoElement.value!,
            player: videoJsPlayer.value!,
            state: readOnlyState.value!
          })
      ])
    }
  }
})
