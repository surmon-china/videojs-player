<p></p>
<p align="center">
  <a href="https://videojs.com/" target="_blank">
    <img height="52px" src="/videojs-logo.png" />
  </a>
</p>


# videojs-player

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/videojs-player.svg?style=for-the-badge)](https://github.com/surmon-china/videojs-player/stargazers)
&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/videojs-player.svg?style=for-the-badge)](https://github.com/surmon-china/videojs-player/issues)
&nbsp;
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/videojs-player.svg?style=for-the-badge)](https://github.com/surmon-china/videojs-player/network)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/surmon-china/videojs-player?style=for-the-badge)](https://codecov.io/gh/surmon-china/videojs-player)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

[![vue-video-player](https://img.shields.io/npm/v/@videojs-player/vue?color=c7343a&label=@videojs-player/vue&style=for-the-badge)](https://www.npmjs.com/package/@videojs-player/vue)
&nbsp;
[![react-video-player](https://img.shields.io/npm/v/@videojs-player/react?color=c7343a&label=@videojs-player/react&style=for-the-badge)](https://www.npmjs.com/package/@videojs-player/react)

[Video.js](https://github.com/videojs/video.js) player component for Vue(3) and React.

---

### BREAKING CHANGE ⚠️

The `vue-video-player` package has now been **renamed** to `@videojs-player/vue` due to the addition of support for React. Also, support for Vue has undergone a Breaking change, with the latest version of the component **only supporting Vue3**.

The last version of the `vue-video-player` package will be released in v6.0, which will just re-export everything from `@videojs-player/vue`, so if you're ready to use the new version of `vue-video-player`, please just improt `@videojs-player/vue`.

The latest version of videojs-player supports responsiveness for the vast majority of Video.js configuration options and allows you to fully customize the player's control panel and interaction details, thanks to the fact that the component does enough processing internally for different frameworks.

### Legacy Version

If you are looking for an legacy version of the component for **Vue2**, use the [vue-video-player@4.x](https://github.com/surmon-china/videojs-player/tree/vue-video-player).

---

### Component Documentation

- [Examples](https://github.surmon.me/videojs-player)
- [Usage of Vue](#usage-vue)
- [Usage of React](#usage-react)
- [Component Props](#component-props)
- [Component Events](#component-events)
- [Player State](#player-state)

### Video.js Documentation

- [Video.js Guides](https://videojs.com/guides)
- [Video.js API Documentation](https://docs.videojs.com/)
- [Video.js Options Reference](https://videojs.com/guides/options/)
- [Video.js Plugins and Skins](https://videojs.com/plugins/)

---

### Usage (Vue)

#### Install

```bash
npm install video.js @videojs-player/vue --save
```

```
yarn add video.js @videojs-player/vue
```

#### Global component

```javascript
import { createApp } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'

const app = createApp()

app.use(VueVideoPlayer)
```

#### Local component

```vue
<template>
  <video-player
    src="/your-xxx-path/video.mp4"
    poster="/your-xxx-path/poster.jpg"
    :loop="true"
    :volume="0.6"
    ...
    @mounted="..."
    @ready="..."
    @play="..."
    @pause="..."
    @ended="..."
    @seeking="..."
    ...
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import { VideoPlayer } from '@videojs-player/vue'

  export default defineComponent({
    components: {
      VideoPlayer
    }
  })
</script>
```

#### Custom player controls

```vue
<template>
  <video-player :children="[]" ...>
    <template v-slot="{ player, state }">
      <div class="player-controls">
        <button @click="state.playing ? player.pause() : player.play()">
          {{ state.playing ? 'Pause' : 'Play' }}
        </button>
        <button @click="player.muted(!state.muted)">
          {{ state.muted ? 'UnMute' : 'Mute' }}
        </button>
        <!-- more custom controls elements ... -->
      </div>
    </template>
  </video-player>
</template>
```

### Usage (React)

#### Install

```bash
npm install video.js @videojs-player/react --save
```

```
yarn add video.js @videojs-player/react
```

#### Component

```jsx
import React from 'react'
import { VideoPlayer } from '@videojs-player/react'

export const Component: React.FC = () => {
  return (
    <VideoPlayer
      src="/your-xxx-path/video.mp4"
      poster="/your-xxx-path/poster.jpg"
      loop={true}
      volume={0.6}
      // more props...
      onMounted={/*...*/}
      onReady={/*...*/}
      onPlay={/*...*/}
      onPause={/*...*/}
      onEnded={/*...*/}
      onSeeking={/*...*/}
      // more events...
    />
  )
}
```

#### Custom player controls

```jsx
import React from 'react'
import { VideoPlayer } from '@videojs-player/react'

export const Component: React.FC = () => {
  return (
    <VideoPlayer videoJsChildren={[]} /* props... */>
      {({ player, state }) => (
        <div class="player-controls">
          <button onClick={() => state.playing ? player.pause() : player.play()}>
            {{ state.playing ? 'Pause' : 'Play' }}
          </button>
          <button onClick={() => player.muted(!state.muted)}>
            {{ state.muted ? 'UnMute' : 'Mute' }}
          </button>
          {/* more custom controls elements ... */}
        </div>
      )}
    </VideoPlayer>
  )
}
```

### Component Props

All parameters are optional and Video.js determines the default value of each prop.

`"responsive"` means that if the prop value you pass in the component changes,
Video.js will automatically respond to the corresponding update,
e.g. a change in `volume` will cause the player to change the volume.

| Prop Name                                       | Video.js API Doc & Description                                                                     | Type                   | Responsive |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------- | :--------------------- | :--------- |
| id                                              | [options.id](https://videojs.com/guides/options/#id)                                               | `String`               |            |
| src                                             | [options.src](https://videojs.com/guides/options/#src)                                             | `String`               | ✓          |
| sources                                         | [options.sources](https://videojs.com/guides/options/#sources)                                     | `Array`                | ✓          |
| width                                           | [options.width](https://videojs.com/guides/options/#width)                                         | `Number`               | ✓          |
| height                                          | [options.height](https://videojs.com/guides/options/#height)                                       | `Number`               | ✓          |
| preload                                         | [options.preload](https://videojs.com/guides/options/#preload)                                     | `String`               | ✓          |
| loop                                            | [options.loop](https://videojs.com/guides/options/#loop)                                           | `Boolean`              | ✓          |
| muted                                           | [options.muted](https://videojs.com/guides/options/#muted)                                         | `Boolean`              | ✓          |
| poster                                          | [options.poster](https://videojs.com/guides/options/#poster)                                       | `String`               | ✓          |
| controls                                        | [options.controls](https://videojs.com/guides/options/#controls)                                   | `Boolean`              | ✓          |
| autoplay                                        | [options.autoplay](https://videojs.com/guides/options/#autoplay)                                   | `Boolean \| String`    | ✓          |
| playsInline                                     | [options.playsInline](https://docs.videojs.com/player#playsinline)                                 | `Boolean`              | ✓          |
| crossOrigin                                     | [options.crossOrigin](https://docs.videojs.com/player#crossorigin)                                 | `String`               | ✓          |
| volume                                          | A number, between 0 and 1, control the volume of the player.                                       | `Number`               | ✓          |
| playbackRate                                    | Control the playback rate of the player.                                                           | `Number`               | ✓          |
| playbackRates                                   | [options.playbackRates](https://videojs.com/guides/options/#playbackrates)                         | `Array<Number>`        | ✓          |
| fluid                                           | [options.fluid](https://videojs.com/guides/options/#fluid)                                         | `Boolean`              | ✓          |
| fill                                            | [options.fill](https://videojs.com/guides/options/#fill)                                           | `Boolean`              | ✓          |
| language                                        | [options.language](https://videojs.com/guides/options/#language)                                   | `String`               | ✓          |
| languages                                       | [options.languages](https://videojs.com/guides/options/#languages)                                 | `Object`               |            |
| tracks                                          | [options.tracks](https://videojs.com/guides/text-tracks/)                                          | `Array`                | ✓          |
| textTrackSettings                               | [options.textTrackSettings](https://docs.videojs.com/texttracksettings)                            | `Object`               | ✓          |
| responsive                                      | [options.responsive](https://videojs.com/guides/options/#responsive)                               | `Boolean`              | ✓          |
| breakpoints                                     | [options.breakpoints](https://videojs.com/guides/options/#breakpoints)                             | `Object`               | ✓          |
| fullscreen                                      | [options.fullscreen](https://videojs.com/guides/options/#fullscreen)                               | `FullscreenOptions`    |            |
| aspectRatio                                     | [options.aspectRatio](https://videojs.com/guides/options/#aspectratio)                             | `Boolean`              | ✓          |
| liveui                                          | [options.liveui](https://videojs.com/guides/options/#liveui)                                       | `Boolean`              |            |
| liveTracker                                     | [options.liveTracker](https://videojs.com/guides/options/#livetrackertrackingthreshold)            | `Object`               |            |
| disablePictureInPicture                         | [options.disablePictureInPicture](https://docs.videojs.com/html5#disablePictureInPicture)          | `Boolean`              | ✓          |
| notSupportedMessage                             | [options.notSupportedMessage](https://videojs.com/guides/options/#notsupportedmessage)             | `String`               | ✓          |
| normalizeAutoplay                               | [options.normalizeAutoplay](https://videojs.com/guides/options/#normalizeautoplay)                 | `Boolean`              | ✓          |
| audioPosterMode                                 | [options.audioPosterMode](https://videojs.com/guides/options/#audiopostermode)                     | `Boolean`              | ✓          |
| audioOnlyMode                                   | [options.audioOnlyMode](https://videojs.com/guides/options/#audioonlymode)                         | `Boolean`              | ✓          |
| noUITitleAttributes                             | [options.noUITitleAttributes](https://videojs.com/guides/options/#nouititleattributes)             | `Boolean`              |            |
| preferFullWindow                                | [options.preferFullWindow](https://videojs.com/guides/options/#preferfullwindow)                   | `Boolean`              |            |
| suppressNotSupportedError                       | [options.suppressNotSupportedError](https://videojs.com/guides/options/#suppressnotsupportederror) | `Boolean`              |            |
| techCanOverridePoster                           | [options.techCanOverridePoster](https://videojs.com/guides/options/#techcanoverrideposter)         | `Boolean`              |            |
| techOrder                                       | [options.techOrder](https://videojs.com/guides/options/#techorder)                                 | `Array`                |            |
| inactivityTimeout                               | [options.inactivityTimeout](https://videojs.com/guides/options/#inactivitytimeout)                 | `Number`               |            |
| userActions                                     | [options.userActions](https://videojs.com/guides/options/#useractions)                             | `Object`               |            |
| restoreEl                                       | [options.restoreEl](https://videojs.com/guides/options/#restoreel)                                 | `Boolean \| Element`   |            |
| vtt.js                                          | [options['vtt.js']](https://videojs.com/guides/options/#vttjs)                                     | `String`               |            |
| `children` (Vue) <br> `videoJsChildren` (React) | [options.children](https://videojs.com/guides/options/#children)                                   | `Array \| Object`      |            |
| html5                                           | [options.html5](https://videojs.com/guides/options/#html5)                                         | `Object`               |            |
| plugins                                         | [options.plugins](https://videojs.com/guides/options/#plugins)                                     | `Object`               |            |
| options                                         | A fallback scheme, if you need to use options that don't exist in props, pass them to `options`.   | `VideoJsPlayerOptions` |            |

### Component Events

Events emitted by Video.js, the argument type is always [`EventTarget`](https://docs.videojs.com/eventtarget).

| Video.js Event                                                                             | 🫥 🫥 🫥 🫥 🫥 🫥 | Vue                      | React                     |
| :----------------------------------------------------------------------------------------- | :---------- | :----------------------- | :------------------------ |
| [event.loadstart](https://docs.videojs.com/player#event:loadstart)                         | -           | `@loadstart`             | `onLoadStart`             |
| [event.suspend](https://docs.videojs.com/player#event:suspend)                             | -           | `@suspend`               | `onSuspend`               |
| [event.abort](https://docs.videojs.com/player#event:abort)                                 | -           | `@abort`                 | `onAbort`                 |
| [event.error](https://docs.videojs.com/player#event:error)                                 | -           | `@error`                 | `onError`                 |
| [event.emptied](https://docs.videojs.com/player#event:emptied)                             | -           | `@emptied`               | `onEmptied`               |
| [event.stalled](https://docs.videojs.com/player#event:stalled)                             | -           | `@stalled`               | `onStalled`               |
| [event.loadedmetadata](https://docs.videojs.com/player#event:loadedmetadata)               | -           | `@loadedmetadata`        | `onLoadedMetadata`        |
| [event.loadeddata](https://docs.videojs.com/player#event:loadeddata)                       | -           | `@loadeddata`            | `onLoadedData`            |
| [event.canplay](https://docs.videojs.com/player#event:canplay)                             | -           | `@canplay`               | `onCanPlay`               |
| [event.canplaythrough](https://docs.videojs.com/player#event:canplaythrough)               | -           | `@canplaythrough`        | `onCanPlayThrough`        |
| [event.playing](https://docs.videojs.com/player#event:playing)                             | -           | `@playing`               | `onPlaying`               |
| [event.waiting](https://docs.videojs.com/player#event:waiting)                             | -           | `@waiting`               | `onWaiting`               |
| [event.seeking](https://docs.videojs.com/player#event:seeking)                             | -           | `@seeking`               | `onSeeking`               |
| [event.seeked](https://docs.videojs.com/player#event:seeked)                               | -           | `@seeked`                | `onSeeked`                |
| [event.ended](https://docs.videojs.com/player#event:ended)                                 | -           | `@ended`                 | `onEnded`                 |
| [event.durationchange](https://docs.videojs.com/player#event:durationchange)               | -           | `@durationchange`        | `onDurationChange`        |
| [event.timeupdate](https://docs.videojs.com/player#event:timeupdate)                       | -           | `@timeupdate`            | `onTimeUpdate`            |
| [event.progress](https://docs.videojs.com/player#event:progress)                           | -           | `@progress`              | `onProgress`              |
| [event.play](https://docs.videojs.com/player#event:play)                                   | -           | `@play`                  | `onPlay`                  |
| [event.pause](https://docs.videojs.com/player#event:pause)                                 | -           | `@pause`                 | `onpause`                 |
| [event.ratechange](https://docs.videojs.com/player#event:ratechange)                       | -           | `@ratechange`            | `onRateChange`            |
| [event.resize](https://docs.videojs.com/player#event:resize)                               | -           | `@resize`                | `onResize`                |
| [event.volumechange](https://docs.videojs.com/player#event:volumechange)                   | -           | `@volumechange`          | `onVolumeChange`          |
| [event.posterchange](https://docs.videojs.com/player#event:posterchange)                   | -           | `@posterchange`          | `onPosterChange`          |
| [event.languagechange](https://docs.videojs.com/player#event:languagechange)               | -           | `@languagechange`        | `onLanguageChange`        |
| [event.fullscreenchange](https://docs.videojs.com/player#event:fullscreenchange)           | -           | `@fullscreenchange`      | `onFullscreenChange`      |
| [event.playbackrateschange](https://docs.videojs.com/player#event:playbackrateschange)     | -           | `@playbackrateschange`   | `onPlaybackRatesChange`   |
| [event.controlsdisabled](https://docs.videojs.com/player#event:controlsdisabled)           | -           | `@controlsdisabled`      | `onControlsDisabled`      |
| [event.controlsenabled](https://docs.videojs.com/player#event:controlsenabled)             | -           | `@controlsenabled`       | `onControlsEnabled`       |
| [event.enterFullWindow](https://docs.videojs.com/player#event:enterFullWindow)             | -           | `@enterFullWindow`       | `onEnterFullWindow`       |
| [event.exitFullWindow](https://docs.videojs.com/player#event:exitFullWindow)               | -           | `@exitFullWindow`        | `onExitFullWindow`        |
| [event.enterpictureinpicture](https://docs.videojs.com/player#event:enterpictureinpicture) | -           | `@enterpictureinpicture` | `onEnterPictureInPicture` |
| [event.leavepictureinpicture](https://docs.videojs.com/player#event:leavepictureinpicture) | -           | `@leavepictureinpicture` | `onLeavePictureInPicture` |
| [event.sourceset](https://docs.videojs.com/player#event:sourceset)                         | -           | `@sourceset`             | `onSourceSet`             |
| [event.texttrackchange](https://docs.videojs.com/player#event:texttrackchange)             | -           | `@texttrackchange`       | `onTextTrackChange`       |
| [event.textdata](https://docs.videojs.com/player#event:textdata)                           | -           | `@textdata`              | `onTextData`              |
| [event.useractive](https://docs.videojs.com/player#event:useractive)                       | -           | `@useractive`            | `onUserActive`            |
| [event.userinactive](https://docs.videojs.com/player#event:userinactive)                   | -           | `@userinactive`          | `onUserInactive`          |
| [event.usingcustomcontrols](https://docs.videojs.com/player#event:usingcustomcontrols)     | -           | `@usingcustomcontrols`   | `onUsingCustomControls`   |
| [event.usingnativecontrols](https://docs.videojs.com/player#event:usingnativecontrols)     | -           | `@usingnativecontrols`   | `onUsingNativeControls`   |
| [event.dispose](https://docs.videojs.com/player#event:dispose)                             | -           | `@dispose`               | `onDispose`               |
| [event.beforepluginsetup](https://docs.videojs.com/player#event:beforepluginsetup)         | -           | `@beforepluginsetup`     | `onBeforePluginSetup`     |
| [event.pluginsetup](https://docs.videojs.com/player#event:pluginsetup)                     | -           | `@pluginsetup`           | `onPluginSetup`           |
| [event.componentresize](https://docs.videojs.com/player#event:componentresize)             | -           | `@componentresize`       | `onComponentResize`       |
| [event.playerresize](https://docs.videojs.com/player#event:playerresize)                   | -           | `@playerresize`          | `onPlayerResize`          |
| [event.tap](https://docs.videojs.com/player#event:tap)                                     | -           | `@tap`                   | `onTap`                   |
| [event.ready](https://docs.videojs.com/player#event:ready)                                 | -           | `@ready`                 | `onReady`                 |

The events emitted by Component.

| Component Event | Description                                                                                                               | Vue          | React           |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------ | :----------- | :-------------- |
| mounted         | Fires when player component mounted. <br> `({ video: HTMLVideoElement, player: VideoJsPlayer, state: VideoPlayerState })` | `@mounted`   | `onMounted`     |
| unmounted       | Fires when player component unmounted.                                                                                    | `@unmounted` | `onUnmounted`   |
| stateChange     | Fires when player state changed (React only). `(state: VideoPlayerState)`                                                 | -            | `onStateChange` |

### Player State

The component maintains a fully responsive state object internally with the player so that you can consume the player state out-of-the-box outside the player,
you can get this object via the `mounted` event or `stateChange` (React Only).

| Key                  | Description                                                    | Value type                                                                         |
| :------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| src                  | The URL of the currently playing video.                        | `String`                                                                           |
| currentSrc           | ditto                                                          | `String`                                                                           |
| currentSource        | The currently playing video source object.                     | [`videojs.Tech.SourceObject`](https://docs.videojs.com/tech#~SourceObject)         |
| width                | Player's width.                                                | `Number`                                                                           |
| height               | Player's height.                                               | `Number`                                                                           |
| currentWidth         | ditto                                                          | `Number`                                                                           |
| currentHeight        | ditto                                                          | `Number`                                                                           |
| videoWidth           | Video element's width.                                         | `Number`                                                                           |
| videoHeight          | Video element's height.                                        | `Number`                                                                           |
| controls             | Whether player controls are enabled or not.                    | `Boolean`                                                                          |
| volume               | Player's volume.                                               | `Number`                                                                           |
| muted                | Is the player muted.                                           | `Boolean`                                                                          |
| poster               | Player poster image URL.                                       | `String`                                                                           |
| playing              | Is it playing now.                                             | `Boolean`                                                                          |
| waiting              | Is it waiting now.                                             | `Boolean`                                                                          |
| seeking              | A seek operation began.                                        | `Boolean`                                                                          |
| paused               | Playback has been paused.                                      | `Boolean`                                                                          |
| ended                | Playback has stopped because the end of the media was reached. | `Boolean`                                                                          |
| currentTime          | -                                                              | `Number`                                                                           |
| duration             | -                                                              | `Number`                                                                           |
| playbackRate         | -                                                              | `Number`                                                                           |
| playbackRates        | -                                                              | `Array<Number>`                                                                    |
| isFullscreen         | -                                                              | `Boolean`                                                                          |
| isInPictureInPicture | Whether it is picture-in-picture mode.                         | `Boolean`                                                                          |
| isLive               | Is the currently playing live video.                           | `Boolean`                                                                          |
| language             | Video.js current language.                                     | `String`                                                                           |
| userActive           | -                                                              | `Boolean`                                                                          |
| readyState           | -                                                              | [`videojs.ReadyState`](https://docs.videojs.com/player#readyState)                 |
| networkState         | -                                                              | [`videojs.NetworkState`](https://docs.videojs.com/player#networkState)             |
| error                | A Custom MediaError of Video.js.                               | [`MediaError \| Null`](https://docs.videojs.com/mediaerror)                        |
| buffered             | An object that contains ranges of time.                        | [`videojs.TimeRange`](https://docs.videojs.com/module-time-ranges.html#~TimeRange) |
| bufferedPercent      | -                                                              | `Number`                                                                           |
| played               | -                                                              | `TimeRanges`                                                                       |
| seekable             | -                                                              | `TimeRanges`                                                                       |
| textTracks           | -                                                              | [`videojs.TextTrackList`](https://docs.videojs.com/texttracklist)                  |
| audioTracks          | -                                                              | [`videojs.AudioTrackList`](https://docs.videojs.com/audiotracklist)                |
| videoTracks          | -                                                              | `videojs.VidioTrackList`                                                           |

### Video.js extension

```javascript
import videojs from 'video.js'

// Video.js plugin
const Plugin = videojs.getPlugin('plugin')
class ExamplePlugin extends Plugin {
  // do something...
}

videojs.registerPlugin('examplePlugin', ExamplePlugin)

// more Video.js operation...
```

### Development

```bash
pnpm install

pnpm dev
pnpm dev:vue
pnpm dev:react

pnpm build
pnpm build:vue
pnpm build:react

pnpm lint
pnpm test
pnpm rebirth
pnpm release
```

### Changelog

- [@videojs-player/vue](./packages/vue/CHANGELOG.md)
- [@videojs-player/react](./packages/react/CHANGELOG.md)
- [vue-video-player](./legacy/CHANGELOG.md)


### License

Licensed under the [MIT](/LICENSE) License.
