import type { VideoJsPlayer as Player } from 'video.js'

export interface VideoJsPlayer extends Player {
  // https://docs.videojs.com/player#playbackRates
  playbackRates(newRates?: number[]): number[]
  // https://docs.videojs.com/player#audioOnlyMode
  // audioOnlyMode(value: boolean): Promise<unknown>
  // https://docs.videojs.com/player#audioPosterMode
  // audioPosterMode(value: boolean): Promise<unknown>
  // https://docs.videojs.com/player#breakpoints
  // breakpoints(value: object | boolean): object
  // https://docs.videojs.com/player#crossOrigin
  // crossOrigin(value?: string): string
  // https://docs.videojs.com/player#disablePictureInPicture
  // disablePictureInPicture(value?: boolean): boolean
  // https://docs.videojs.com/player#isInPictureInPicture
  // isInPictureInPicture(value?: boolean): boolean
}

// Video.js Deprecated APIs

// Options
// - defaultVolume @6.0.0 (2017-04-03) https://github.com/videojs/video.js/blob/main/CHANGELOG.md#code-refactoring-11
// - sourceOrder @6.0.0 (2017-04-03) https://github.com/videojs/video.js/blob/main/CHANGELOG.md#breaking-changes-1

// Events
// - firstplay @6.1.0 (2017-05-15) https://github.com/videojs/video.js/blob/main/CHANGELOG.md#610-2017-05-15
