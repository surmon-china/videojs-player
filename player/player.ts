import videoJs, { VideoJsPlayerOptions } from 'video.js'
import { propsConfig, Props, PropKey } from './props'
import { events, EventKey } from './events'
import type { VideoJsPlayer } from './type'

/**
 * Transform `string` className to `array`.
 * @description ```
 *  input: " test-a    test-b   test-c  "
 *  output: ["test-a", "test-b", "test-c"]
 * ```
 */
const standardizeClass = (className: string | void) => {
  const trimmed = className?.trim().replace(/\s+/g, ' ')
  return trimmed ? trimmed.split(' ') ?? [] : []
}

export interface CreatePlayerOptions {
  props: Props
  element: HTMLElement
  className?: string
  onEvent(eventName: EventKey, payload: Event): void
}

export type PlayerResult = ReturnType<typeof createPlayer>
export const createPlayer = ({ props, element, className, onEvent }: CreatePlayerOptions) => {
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

  // https://videojs.com/guides/embeds/
  // https://videojs.com/guides/react/
  // MARK: Player div ingest
  // There are three ways to initialize a player, the "Player div ingest" type is the most suitable in a component scenario
  // because it generates the least amount of DOM side effects,
  // and this way it can fully utilize the existing div outer container and video elements without changing the DOM structure.
  // The problem is that the Video.js player, when instantiated, reads the className property of the video element as the className of the outer container,
  // but the component needs to satisfy the user's need to "be able to use the className to specify the style from the moment the component is rendered".
  // So we need to assume that only the className specified by the user through the component is needed for style control,
  // while the basic "video-js" - like className is another internal className with a specific side effect and used only for initializing the player.
  // So we need to distinguish the className into innerClassName, which is controlled internally by the component and remains unchanged,
  // and userClassName, which will be applied to the container element at times like init and change.
  // The reason why userClassName cannot be used directly as className for video elements is that it may cause unintended style side effects,
  // such as misalignment or recursive styles, due to the different DOM hierarchy.
  // MARK: RawHTML
  // A better solution may exist to create the player with a freshly created video element while maintaining a mounted identifier,
  // and when the player is instantiated, return the instantiated DOM entirely through the component,
  // but this relies on the framework supporting a RawHTML - like API - https://github.com/ reactjs/rfcs/pull/129
  // Custom controls capabilities can be implemented through the Video.js Component - https://videojs.com/guides/react/
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

  // The component needs to be initialized with the initial className of the container element to
  // avoid flickering of the style caused by applying the className after the player has been instantiated.
  // There are two separate times when initClassName is consumed.
  // 1. when the component is first rendered, before the player is instantiated,
  // the className should act on the root container of the component's original element,
  // which allows the user to control the style before the component is mounted.
  // 2. Before the component is mounted, `addClass(initClassName)` should be applied to the player immediately after the player is created,
  // as Video.js does not support such an option for className, so we have to do this,
  // and currently the synchronization feature of the browser ensures that the user
  // does not perceive the "init(component) > remove(createPlayer) > add(player.addClass)" replacement process for className.
  if (className) {
    standardizeClass(className).map((name) => player.addClass(name))
  }

  // Set new class names to Video.js container element.
  const updateClassNames = (oldClassName: string | void, newClassName: string | void) => {
    standardizeClass(oldClassName).map((name) => player.removeClass(name))
    standardizeClass(newClassName).map((name) => player.addClass(name))
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
