import type { VideoJsPlayerOptions } from 'video.js'
import type { VideoJsPlayer } from './type'

type PropType<T = any> = { (): T }
type InferPropType<T> = T extends PropType<infer V> ? V : T

const prop = <T>(options: {
  type: PropType<T>
  default?: any
  onChange?: (player: VideoJsPlayer, newValue: T, oldValue?: T) => any
  onEvent?: (player: VideoJsPlayer, callback: (newValue: T) => void) => any
}) => options

// Standard <video> Element Options
// https://videojs.com/guides/options/#standard
const videoProps = {
  src: prop({
    type: String,
    onChange: (player, src) => player.src(src)
  }),
  width: prop({
    type: Number,
    onChange: (player, width) => player.width(width),
    onEvent: (player, cb) => {
      player.on(['playerresize', 'resize'], () => cb(player.width()))
    }
  }),
  height: prop({
    type: Number,
    onChange: (player, height) => player.height(height),
    onEvent: (player, cb) => {
      player.on(['playerresize', 'resize'], () => cb(player.height()))
    }
  }),
  preload: prop({
    type: String as PropType<'auto' | 'metadata' | 'none'>,
    // https://github.com/videojs/video.js/blob/main/src/js/player.js#L3696
    onChange: (player, preload) => player.preload(preload as any)
  }),
  loop: prop({
    type: Boolean,
    onChange: (player, loop) => player.loop(loop)
  }),
  muted: prop({
    type: Boolean,
    onChange: (player, muted) => player.muted(muted),
    onEvent: (player, cb) => player.on('volumechange', () => cb(player.muted()))
  }),
  poster: prop({
    type: String,
    onChange: (player, poster) => player.poster(poster),
    onEvent: (player, cb) => player.on('posterchange', () => cb(player.poster()))
  }),
  controls: prop({
    type: Boolean,
    onChange: (player, controls) => player.controls(controls),
    onEvent: (player, cb) => {
      player.on('controlsenabled', () => cb(true))
      player.on('controlsdisabled', () => cb(false))
    }
  }),
  // https://videojs.com/guides/options/#autoplay
  autoplay: prop({
    type: [Boolean, String] as unknown as PropType<boolean | 'muted' | 'play' | 'any'>,
    onChange: (player, autoplay) => player.autoplay(autoplay)
  }),
  playsinline: prop({
    type: Boolean,
    onChange: (player, value) => player.playsinline(value)
  }),
  playsInline: prop({
    type: Boolean,
    onChange: (player, value) => player.playsinline(value)
  }),
  crossorigin: prop({
    type: String,
    onChange: (player, value) => player.crossOrigin(value)
  }),
  crossOrigin: prop({
    type: String,
    onChange: (player, value) => player.crossOrigin(value)
  })
}

// Video.js specific Options
// https://videojs.com/guides/options/#videojs-specific-options
const videoJsProps = {
  id: prop({ type: String }),
  sources: prop({
    type: Array as PropType<NonNullable<VideoJsPlayerOptions['sources']>>,
    onChange: (player, sources) => player.src(sources)
  }),
  tracks: prop({
    type: Array as PropType<NonNullable<VideoJsPlayerOptions['tracks']>>,
    onChange: (player, newTracks) => {
      // https://github.com/videojs/videojs-playlist/blob/main/src/play-item.js
      const oldTracks = player.remoteTextTracks()
      // This uses a `while` loop rather than `forEach` because the `TextTrackList` object is a live DOM list (not an array).
      let index = oldTracks?.length || 0
      while (index--) {
        player.removeRemoteTextTrack(oldTracks[index] as any as HTMLTrackElement)
      }
      // Add new text tracks.
      player.ready(() => {
        newTracks.forEach((track) => player.addRemoteTextTrack(track, false))
      })
    }
  }),
  textTrackSettings: prop({
    type: Object as PropType<NonNullable<VideoJsPlayerOptions['textTrackSettings']>>,
    onChange: (player, value) => (player as any).textTrackSettings.options(value)
  }),
  language: prop({
    type: String,
    onChange: (player, language) => player.language(language),
    onEvent: (player, cb) => player.on('languagechange', () => cb(player.language()))
  }),
  // https://videojs.com/guides/options/#languages
  // https://videojs.com/guides/languages/
  // https://docs.videojs.com/module-videojs-videojs.html#.addLanguage
  languages: prop({
    type: Object as PropType<NonNullable<VideoJsPlayerOptions['languages']>>
  }),
  playbackRates: prop({
    type: Array as PropType<NonNullable<VideoJsPlayerOptions['playbackRates']>>,
    onChange: (player, newRates) => player.playbackRates(newRates ?? []),
    onEvent: (player, cb) => {
      player.on('playbackrateschange', () => cb(player.playbackRates()))
    }
  }),
  audioOnlyMode: prop({
    type: Boolean,
    onChange: (player, value) => player.audioOnlyMode(value)
  }),
  audioPosterMode: prop({
    type: Boolean,
    onChange: (player, value) => player.audioPosterMode(value)
  }),
  responsive: prop({
    type: Boolean,
    onChange: (player, value) => player.responsive(value)
  }),
  breakpoints: prop({
    type: Object,
    onChange: (player, value) => player.breakpoints(value)
  }),
  fluid: prop({
    type: Boolean,
    onChange: (player, value) => player.fluid(value)
  }),
  // https://docs.videojs.com/player#fill
  fill: prop({
    type: Boolean,
    onChange: (player, value) => player.fill(value)
  }),
  aspectRatio: prop({
    type: String,
    onChange: (player, ratio) => player.aspectRatio(ratio)
  }),
  // https://videojs.com/guides/options/#fullscreen
  fullscreen: prop({
    type: Object as PropType<
      Partial<{
        options: FullscreenOptions
        [key: string]: any
      }>
    >
  }),
  // https://videojs.com/guides/options/#liveui
  liveui: prop({ type: Boolean }),
  // https://videojs.com/guides/options/#livetrackertrackingthreshold
  liveTracker: prop({
    type: Object as PropType<
      Partial<{
        trackingThreshold: number
        liveTolerance: number
        [key: string]: any
      }>
    >
  }),
  disablePictureInPicture: prop({
    type: Boolean,
    onChange: (player, value) => player.disablePictureInPicture(value)
  }),
  notSupportedMessage: prop({ type: String }),
  normalizeAutoplay: prop({ type: Boolean }),
  noUITitleAttributes: prop({ type: Boolean }),
  preferFullWindow: prop({ type: Boolean }),
  suppressNotSupportedError: prop({ type: Boolean }),
  techCanOverridePoster: prop({ type: Boolean }),
  reportTouchActivity: prop({ type: Boolean }),
  techOrder: prop({ type: Array as PropType<Array<string>> }),
  // https://videojs.com/guides/options/#inactivitytimeout
  inactivityTimeout: prop({ type: Number }),
  userActions: prop({
    type: Object as PropType<NonNullable<VideoJsPlayerOptions['userActions']>>
  }),
  // https://videojs.com/guides/options/#plugins
  // https://videojs.com/guides/plugins/
  plugins: prop({
    type: Object as PropType<NonNullable<VideoJsPlayerOptions['plugins']>>
  }),
  restoreEl: prop({ type: [Boolean, Object] as unknown as PropType<boolean | Element> }),
  'vtt.js': prop({ type: String })
}

// Video.js component Options
// https://videojs.com/guides/options/#component-options
const videoJsComponentProps = {
  children: prop({
    type: [Array, Object] as unknown as PropType<NonNullable<VideoJsPlayerOptions['children']>>
  }),
  // https://videojs.com/guides/options/#controlbarremainingtimedisplaydisplaynegative
  controlBar: prop({
    type: Object as PropType<NonNullable<VideoJsPlayerOptions['controlBar']>>,
    onChange: (player, value) => player.controlBar.options(value)
  })
}

// Video.js tech Options
// https://videojs.com/guides/options/#tech-options
const videoJsTechProps = {
  html5: prop({
    type: Object as PropType<
      Partial<{
        vhs: any
        nativeControlsForTouch: boolean
        nativeAudioTracks: boolean
        nativeTextTracks: boolean
        nativeVideoTracks: boolean
        preloadTextTracks: boolean
      }>
    >
  })
}

// Framework component Options
const componentProps = {
  volume: prop({
    type: Number,
    onChange: (player, volume) => player.volume(volume),
    onEvent: (player, cb) => player.on('volumechange', () => cb(player.volume()))
  }),
  playbackRate: prop({
    type: Number,
    onChange(player, rate) {
      // When playbackRate changes, sync the value to defaultPlaybackRate to
      // ensure that the last saved playbackRate is automatically read when the video changes source.
      player.playbackRate(rate)
      player.defaultPlaybackRate(rate)
    },
    onEvent(player, callback) {
      player.on('ratechange', () => {
        callback(player.playbackRate())
      })
    }
  }),
  // Fallback for video.js options
  options: prop({
    type: Object as PropType<VideoJsPlayerOptions>
  })
}

export const propsConfig = {
  ...videoProps,
  ...videoJsProps,
  ...videoJsComponentProps,
  ...videoJsTechProps,
  ...componentProps
} as const

export type PropsConfig = typeof propsConfig
export type PropKey = keyof PropsConfig
export type Props = {
  [K in PropKey]?: InferPropType<typeof propsConfig[K]['type']>
}

export const propKeys = Object.keys(propsConfig) as Array<PropKey>
