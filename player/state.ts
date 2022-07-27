import type { VideoJsPlayer as Player } from './type'

// https://videojs.com/advanced/
// https://github.com/videojs/videojs.com/blob/main/src/components/HomeComponents/AdvancedExample/mediaProperties.js
// https://github.com/videojs/videojs.com/blob/main/src/components/HomeComponents/AdvancedExample/MediaPropertyItem.jsx
const StateConfig = {
  // autoplay: { getter: (player: P) => player.autoplay() }, // ✘
  // loop: { getter: (player: P) => player.loop() }, // ✘
  // preload: { getter: (player: P) => player.preload() }, // ✘
  // playsInline: { getter: (player: P) => player.playsinline() }, // ✘
  // crossOrigin: { getter: (player: P) => player.crossOrigin() }, // ✘
  src: {
    getter: (player: Player) => player.src()
  },
  currentSrc: {
    getter: (player: Player) => player.currentSrc()
  },
  currentSource: {
    getter: (player: Player) => player.currentSource()
  },
  width: {
    events: ['resize', 'playerresize'],
    getter: (player: Player) => player.width()
  },
  height: {
    events: ['resize', 'playerresize'],
    getter: (player: Player) => player.height()
  },
  currentWidth: {
    events: ['resize', 'playerresize'],
    getter: (player: Player) => player.currentWidth()
  },
  currentHeight: {
    events: ['resize', 'playerresize'],
    getter: (player: Player) => player.currentHeight()
  },
  videoWidth: {
    events: ['resize', 'playerresize'],
    getter: (player: Player) => player.videoWidth()
  },
  videoHeight: {
    events: ['resize', 'playerresize'],
    getter: (player: Player) => player.videoHeight()
  },
  controls: {
    events: ['controlsdisabled', 'controlsenabled'],
    getter: (player: Player) => player.controls()
  },
  volume: {
    events: ['volumechange'],
    getter: (player: Player) => player.volume()
  },
  muted: {
    events: ['volumechange'],
    getter: (player: Player) => player.muted()
  },
  poster: {
    events: ['posterchange'],
    getter: (player: Player) => player.poster()
  },
  seeking: {
    events: ['seeking'],
    getter: (player: Player) => player.seeking()
  },
  paused: {
    events: ['pause', 'play', 'playing'],
    getter: (player: Player) => player.paused()
  },
  ended: {
    events: ['ended', 'play'],
    getter: (player: Player) => player.ended()
  },
  currentTime: {
    events: ['timeupdate'],
    getter: (player: Player) => player.currentTime()
  },
  duration: {
    events: ['durationchange'],
    getter: (player: Player) => player.duration()
  },
  playbackRate: {
    events: ['ratechange'],
    getter: (player: Player) => player.playbackRate()
  },
  playbackRates: {
    events: ['playbackrateschange'],
    getter: (player: Player) => player.playbackRates()
  },
  fullscreen: {
    events: ['fullscreenchange'],
    getter: (player: Player) => player.isFullscreen()
  },
  language: {
    events: ['languagechange'],
    getter: (player: Player) => player.language()
  },
  userActive: {
    events: ['useractive', 'userinactive'],
    getter: (player: Player) => player.userActive()
  },
  readyState: {
    events: ['loadeddata'],
    getter: (player: Player) => player.readyState()
  },
  networkState: {
    events: ['loadeddata', 'error'],
    getter: (player: Player) => player.networkState()
  },
  error: {
    events: ['loadeddata', 'error'],
    getter: (player: Player) => player.error()
  },
  buffered: {
    events: ['progress'],
    getter: (player: Player) => player.buffered()
  },
  bufferedPercent: {
    events: ['progress'],
    getter: (player: Player) => player.bufferedPercent()
  },
  played: {
    events: ['timeupdate'],
    getter: (player: Player) => player.played()
  },
  seekable: {
    events: ['progress', 'seeked'],
    getter: (player: Player) => player.seekable()
  },
  audioTracks: {
    getter: (player: Player) => player.audioTracks?.()
  },
  videoTracks: {
    getter: (player: any) => player.videoTracks?.()
  },
  textTracks: {
    getter: (player: Player) => player.textTracks?.()
  }
}

type PlayerBastState = {
  [K in keyof typeof StateConfig]: ReturnType<typeof StateConfig[K]['getter']>
}
export interface PlayerState extends PlayerBastState {
  playing: boolean
  waiting: boolean
}

export interface CreatePlayerStateOptions {
  onInit: (state: PlayerState) => void
  onUpdate: <K extends keyof PlayerState>(key: K, value: PlayerState[K], state: PlayerState) => void
}

export const createPlayerState = (player: Player, options: CreatePlayerStateOptions) => {
  const keys = Object.keys(StateConfig) as Array<keyof typeof StateConfig>
  const state = keys.reduce(
    (result, key) => {
      const value = StateConfig[key].getter(player) as never
      return { ...result, [key]: value }
    },
    { playing: false, waiting: false } as PlayerState
  )

  // update state
  const updateState = (key: keyof PlayerState, value: any) => {
    state[key] = value as never
    options.onUpdate(key, value, { ...state })
  }

  // playing state https://github.com/videojs/video.js/issues/181
  // un-loop: play > playing > pause > ended
  // loop: play > playing > [ended > restart] waiting > playing
  player.on(['pause', 'ended'], () => {
    updateState('playing', false)
  })
  player.on(['play', 'playing'], () => {
    updateState('playing', true)
  })

  // https://github.com/videojs/video.js/blob/75ea699273d659593d95429d185865fb6e49cb93/src/js/player.js#L1743
  player.on('waiting', () => {
    updateState('waiting', true)
    const timeWhenWaiting = player.currentTime()
    const timeUpdateListener = () => {
      if (timeWhenWaiting !== player.currentTime()) {
        updateState('waiting', false)
        player.off('timeupdate', timeUpdateListener)
      }
    }
    player.on('timeupdate', timeUpdateListener)
  })

  keys.forEach((key) => {
    const target = StateConfig[key]
    const baseEvents = ['loadstart', 'loadedmetadata']
    player.on(baseEvents.concat((target as any).events ?? []), () => {
      updateState(key, target.getter(player))
    })
  })

  // init state
  options.onInit({ ...state })
}
