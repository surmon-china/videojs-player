import videoJs, { VideoJsPlayerOptions } from 'video.js'
import { props as _props, Props, PropKey } from './props'
import { eventKeys, EventKey } from './events'
import type { VideoJsPlayer } from './type'

export interface CreatePlayerOptions {
  element: HTMLElement
  props: Props
  onEvent(eventName: EventKey, payload: Event): void
}

export type PlayerResult = ReturnType<typeof createPlayer>
export const createPlayer = ({ props, element, onEvent }: CreatePlayerOptions) => {
  // exclude fallback options
  const { options: fallbackOptions = {}, ...rawProps } = props

  // exclude undefined value
  const propOptions: Omit<Props, 'options'> = {}
  const rawPropKeys = Object.keys(rawProps) as Array<keyof typeof rawProps>
  rawPropKeys.forEach((key) => {
    const value = rawProps[key]
    if (value !== undefined) {
      // @ts-ignore
      propOptions[key] = value
    }
  })

  // merge fallback options
  // exclude component options
  const { volume, playbackRate, ...initOptions } = {
    ...propOptions,
    ...fallbackOptions
  }

  // init player
  const player = videoJs(element, initOptions, function () {
    // stringing video.js events to vue emits
    eventKeys.forEach((eventKey) => {
      this.on(eventKey, (events) => {
        onEvent(eventKey, events)
      })
    })
  }) as VideoJsPlayer

  // init src
  if (initOptions.src) {
    player.src(initOptions.src)
  }

  // init volume
  if (volume && Number.isFinite(volume)) {
    player.volume(volume)
  }

  // init playbackRate
  if (playbackRate && Number.isFinite(playbackRate)) {
    player.playbackRate(playbackRate)
  }

  // set new options to Video.js
  const updateOptions = (options: VideoJsPlayerOptions) => {
    player.options?.(options ?? {})
  }

  // set new prop value to Video.js config
  const updatePropOption = <K extends PropKey>(key: K, value: Props[K]) => {
    updateOptions({ [key]: value })
    _props[key]?.onChange?.(player, value as never)
  }

  return {
    player,
    dispose: player.dispose,
    updateOptions,
    updatePropOption
  }
}
