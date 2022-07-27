// https://www.w3.org/2010/05/video/mediaevents.html
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#events
// https://github.com/videojs/video.js/blob/main/src/js/tech/html5.js#L1204
const HTML5Events = {
  loadstart: 'onLoadStart',
  suspend: 'onSuspend',
  abort: 'onAbort',
  error: 'onError',
  emptied: 'onEmptied',
  stalled: 'onStalled',
  loadedmetadata: 'onLoadedMetadata',
  loadeddata: 'onLoadedData',
  canplay: 'onCanPlay',
  canplaythrough: 'onCanPlayThrough',
  playing: 'onPlaying',
  waiting: 'onWaiting',
  seeking: 'onSeeking',
  seeked: 'onSeeked',
  ended: 'onEnded',
  durationchange: 'onDurationChange',
  timeupdate: 'onTimeUpdate',
  progress: 'onProgress',
  play: 'onPlay',
  pause: 'onpause',
  ratechange: 'onRateChange',
  resize: 'onResize',
  volumechange: 'onVolumeChange'
} as const

// https://docs.videojs.com/player#event
const VideoJsEvents = {
  posterchange: 'onPosterChange',
  languagechange: 'onLanguageChange',
  fullscreenchange: 'onFullscreenChange',
  playbackrateschange: 'onPlaybackRatesChange',
  controlsdisabled: 'onControlsDisabled',
  controlsenabled: 'onControlsEnabled',
  enterFullWindow: 'onEnterFullWindow',
  exitFullWindow: 'onExitFullWindow',
  enterpictureinpicture: 'onEnterPictureInPicture',
  leavepictureinpicture: 'onLeavePictureInPicture',
  // https://docs.videojs.com/player#event:sourceset
  sourceset: 'onSourceSet',
  texttrackchange: 'onTextTrackChange',
  textdata: 'onTextData',
  useractive: 'onUserActive',
  userinactive: 'onUserInactive',
  usingcustomcontrols: 'onUsingCustomControls',
  usingnativecontrols: 'onUsingNativeControls',
  dispose: 'onDispose'
} as const

const PluginEvents = {
  beforepluginsetup: 'onBeforePluginSetup',
  pluginsetup: 'onPluginSetup'
  /*'pluginsetup:$name'*/
} as const

const ComponentEvents = {
  componentresize: 'onComponentResize',
  playerresize: 'onPlayerResize',
  ready: 'onReady',
  tap: 'onTap'
} as const

export const events = {
  ...HTML5Events,
  ...VideoJsEvents,
  ...PluginEvents,
  ...ComponentEvents
} as const

export type EventKey = keyof typeof events
export const eventKeys = Object.keys(events) as Array<EventKey>

export type CamelCaseEventKey = typeof camelCaseEventKeys[number]
export const camelCaseEventKeys = Object.values(events)
