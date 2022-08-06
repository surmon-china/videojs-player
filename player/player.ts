import videoJs, { VideoJsPlayerOptions } from 'video.js'
import { propsConfig, Props, PropKey } from './props'
import { events, EventKey } from './events'
import type { VideoJsPlayer } from './type'

export interface CreatePlayerOptions {
  element: HTMLElement
  props: Props
  onEvent(eventName: EventKey, payload: Event): void
}

export type PlayerResult = ReturnType<typeof createPlayer>
export const createPlayer = ({ props, element, onEvent }: CreatePlayerOptions) => {
  // Exclude fallback options.
  const { options: fallbackOptions = {}, ...optProps } = props

  // Exclude undefined value.
  const propOptions: Omit<Props, 'options'> = {}
  const optPropKeys = Object.keys(optProps) as Array<keyof typeof optProps>
  optPropKeys.forEach((key) => {
    const value = optProps[key]
    if (value !== undefined) {
      // @ts-ignore
      propOptions[key] = value
    }
  })

  // Merge fallback options & exclude component options.
  const { volume, playbackRate, ...initOptions } = {
    ...propOptions,
    ...fallbackOptions
  }

  // Merge some confusing prop names.
  const videoJsOptions = {
    ...initOptions,
    // https://videojs.com/guides/options/#restoreel
    // Since the dispose > restore element side effect of Video.js occurs after the component has been unmounted,
    // a DOM retention error will occur if true, so it cannot be set to true.
    // restoreEl: initOptions.restoreEl ?? false,
    // Video.js only supports the `playsinline` property.
    playsinline: initOptions.playsinline ?? initOptions.playsInline
  }

  // init player
  const player = videoJs(element, videoJsOptions, function () {
    // Stringing video.js events to vue emits.
    events.forEach((eventKey) => {
      this.on(eventKey, (payload) => {
        onEvent(eventKey, payload)
      })
    })

    // init src
    if (initOptions.src && !initOptions.sources) {
      this.src(initOptions.src)
    }

    // init volume
    if (volume && Number.isFinite(volume)) {
      this.volume(volume)
    }

    // init playbackRate
    // https://github.com/videojs/video.js/issues/5128
    // https://github.com/videojs/video.js/issues/2516
    // https://github.com/videojs/videojs-playlist/issues/158
    // https://github.com/sampotts/plyr/blob/master/src/js/plyr.js#L677
    // https://github.com/bytedance/xgplayer/blob/master/packages/xgplayer/src/skin/controls/playbackRate.js#L30
    if (playbackRate && Number.isFinite(playbackRate)) {
      // Video always reads defaultPlaybackRate as the initial playbackRate when switching video sources.
      this.defaultPlaybackRate(playbackRate)
      // Ensures that all synchronization code has been executed by the time playbackRate is executed.
      setTimeout(() => {
        this.playbackRate(playbackRate)
      }, 0)
    }
  }) as VideoJsPlayer

  // Set new class names to Video.js container element.
  const updateClassNames = (oldClassName: string | void, newClassName: string | void) => {
    // Preprocessing of className: ` test-a    test-b   test-c  ` > `test-a test-b test-c`
    const standardize = (name: string | void) => {
      const trimmed = name?.trim().replace(/\s+/g, ' ')
      return trimmed ? trimmed.split(' ') ?? [] : []
    }

    standardize(oldClassName).map((name) => player.removeClass(name))
    standardize(newClassName).map((name) => player.addClass(name))
  }

  // Set new options to Video.js config.
  const updateOptions = (options: VideoJsPlayerOptions) => {
    player.options?.(options ?? {})
  }

  // Set new prop value to Video.js config.
  const updatePropOption = <K extends PropKey>(key: K, value: Props[K]) => {
    updateOptions({ [key]: value })
    propsConfig[key]?.onChange?.(player, value as never)
  }

  const disposePlayer = () => player.dispose()

  return {
    player,
    dispose: disposePlayer,
    updateClassNames,
    updateOptions,
    updatePropOption
  }
}
