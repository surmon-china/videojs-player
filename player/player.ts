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

  // merge fallback options & exclude component options
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
    // https://github.com/bytedance/xgplayer/blob/master/packages/xgplayer/src/skin/controls/playbackRate.js#L30
    if (playbackRate && Number.isFinite(playbackRate)) {
      // TODO: test!
      this.playbackRate(playbackRate)
      this.defaultPlaybackRate(playbackRate)
      // this.on('loadstart', (events) => {
      //   console.log('---loadstart', this.defaultPlaybackRate())
      // })
      // this.on('loadedmetadata', (events) => {
      //   console.log('---loadedmetadata', this.defaultPlaybackRate())
      // })
      // this.on('loadeddata', (events) => {
      //   console.log('---loadeddata', this.defaultPlaybackRate())
      // })
      // this.on('progress', (events) => {
      //   console.log('---progress', this.defaultPlaybackRate())
      // })
      // this.on('canplay', (events) => {
      //   console.log('---canplay', this.defaultPlaybackRate())
      // })
      // this.on('canplaythrough', (events) => {
      //   // this.playbackRate(playbackRate)
      //   console.log('---canplaythrough', this.defaultPlaybackRate())
      // })
      // this.on('playing', (events) => {
      //   console.log('---playing', this.defaultPlaybackRate())
      // })
      // this.on('play', (events) => {
      //   console.log('---play', this.defaultPlaybackRate())
      // })
    }
  }) as VideoJsPlayer

  // set new classnames
  const updateClassNames = (oldClassName: string | void, newClassName: string | void) => {
    const oNames = oldClassName?.split(' ')
    if (oNames?.length) {
      oNames.map((name) => player.removeClass(name))
    }
    const nNames = newClassName?.split(' ')
    if (nNames?.length) {
      nNames.map((name) => player.addClass(name))
    }
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
    updateClassNames,
    updateOptions,
    updatePropOption
  }
}
