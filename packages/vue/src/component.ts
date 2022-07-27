import { defineComponent, onMounted, onBeforeUnmount, h } from 'vue'
import { shallowRef, ref, computed, readonly, watch, toRaw, DeepReadonly } from 'vue'
import type { PlayerState, PlayerResult, PropKey } from '../../../player'
import { createPlayer, createPlayerState, eventKeys, props as _props } from '../../../player'
import { normalizeProps, normalizeEvents, bindPropUpdateEvent } from './helper'

const MOUNTED_EVENT_NAME = 'mounted'

export default defineComponent({
  name: 'VueVideoPlayer',
  props: { ...normalizeProps(_props) },
  emits: [...normalizeEvents(eventKeys), MOUNTED_EVENT_NAME],
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
      const _player = createPlayer({
        element: videoElement.value!,
        props: toRaw(props),
        onEvent: context.emit
      })

      // sync Video.js config change to update:prop event
      bindPropUpdateEvent({
        player: _player.player,
        onEvent: context.emit
      })

      // sync fallback options to Video.js config
      watch(
        () => props.options,
        (newOptions) => _player.updateOptions(newOptions ?? {}),
        { deep: true }
      )

      // sync component props to Video.js config
      Object.keys(_props)
        .filter((key) => key !== 'options')
        .forEach((key) => {
          const k = key as PropKey
          watch(
            () => props[k],
            (newValue) => _player.updatePropOption(k, newValue),
            { deep: true }
          )
        })

      // create player state
      createPlayerState(_player.player, {
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
      playerResult.value = _player
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
      }
    })

    return () => {
      return h('div', { class: 'v-video-player' }, [
        h('video', {
          class: 'video-js',
          ref: videoElement
        }),
        mounted.value &&
          context.slots.default?.({
            video: videoElement.value,
            player: videoJsPlayer.value,
            state: readOnlyState.value
          })
      ])
    }
  }
})
