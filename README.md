# videojs-player

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/videojs-player.svg?style=for-the-badge)](https://github.com/surmon-china/videojs-player/stargazers)
&nbsp;
[![vue-video-player](https://img.shields.io/npm/v/@videojs-player/vue?color=c7343a&label=@videojs-player/vue&style=for-the-badge)](https://www.npmjs.com/package/@videojs-player/vue)
&nbsp;
[![react-video-player](https://img.shields.io/npm/v/@videojs-player/react?color=c7343a&label=@videojs-player/react&style=for-the-badge)](https://www.npmjs.com/package/@videojs-player/react)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/surmon-china/videojs-player?style=for-the-badge)](https://codecov.io/gh/surmon-china/videojs-player)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

[Video.js](https://github.com/videojs/video.js) player component for Vue and React.

---

### Breaking Change ⚠️

The `vue-video-player` package has now been renamed to `@videojs-player/vue` due to the addition of support for React. Also, support for Vue has undergone a Breaking change, with the latest version of the component only supporting Vue3.

The last version of the `vue-video-player` package will be released in v6.0, which will just re-export everything from `@videojs-player/vue`, so if you're ready to use the new version of `vue-video-player`, please just improt `@videojs-player/vue`.

The latest version of videojs-player supports responsiveness for the vast majority of Video.js configuration options and allows you to fully customize the player's control panel and interaction details, thanks to the fact that the component does enough processing internally for different frameworks.

### Legacy Version

If you are looking for an legacy version of the component for Vue2, use the [vue-video-player@4.x](https://github.com/surmon-china/videojs-player/tree/vue-video-player).

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
    src="/yout-xxx-path/video.mp4"
    autoplay="muted"
    :loop="true"
    :volume="true"
    ...
    @mounted="..."
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
        <button class="item" @click="state.playing ? player.pause() : player.play()">
          {{ state.playing ? 'Pause' : 'Play' }}
        </button>
        <button class="item" @click="player.muted(!state.muted)">
          {{ state.muted ? 'unmuted' : 'mute' }}
        </button>
        <!-- your custom controls element... -->
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
      src="/yout-xxx-path/video.mp4"
      autoplay="muted"
      loop={true}
      volume={true}
      // props...
      onMounted={/*...*/}
      onPlay={/*...*/}
      onPause={/*...*/}
      onEnded={/*...*/}
      onSeeking={/*...*/}
      // events...
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
          <button class="item" onClick={() => state.playing ? player.pause() : player.play()}>
            {{ state.playing ? 'Pause' : 'Play' }}
          </button>
          <button class="item" onClick={() => player.muted(!state.muted)}>
            {{ state.muted ? 'unmuted' : 'mute' }}
          </button>
          {/* your custom controls element... */}
        </div>
      )}
    </VideoPlayer>
  )
}
```

### Component Props

All parameters are optional and Video.js determines the default value of each prop.

| prop                                        | Video.js API Documentation                                                                                       | type                 | responsive |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- | :------------------- | :--------- |
| id                                          | [`options.id`](https://videojs.com/guides/options/#id)                                                           | `String`             |            |
| src                                         | [`options.src`](https://videojs.com/guides/options/#src)                                                         | `String`             | ✓          |
| sources                                     | [`options.sources`](https://videojs.com/guides/options/#sources)                                                 | `Array`              | ✓          |
| width                                       | [`options.width`](https://videojs.com/guides/options/#width)                                                     | `Number`             | ✓          |
| height                                      | [`options.height`](https://videojs.com/guides/options/#height)                                                   | `Number`             | ✓          |
| preload                                     | [`options.preload`](https://videojs.com/guides/options/#preload)                                                 | `String`             | ✓          |
| loop                                        | [`options.loop`](https://videojs.com/guides/options/#loop)                                                       | `Boolean`            | ✓          |
| muted                                       | [`options.muted`](https://videojs.com/guides/options/#muted)                                                     | `Boolean`            | ✓          |
| poster                                      | [`options.poster`](https://videojs.com/guides/options/#poster)                                                   | `String`             | ✓          |
| controls                                    | [`options.controls`](https://videojs.com/guides/options/#controls)                                               | `Boolean`            | ✓          |
| autoplay                                    | [`options.autoplay`](https://videojs.com/guides/options/#autoplay)                                               | `Boolean \| String`  | ✓          |
| playsInline                                 | [`options.playsInline`](https://docs.videojs.com/player#playsinline)                                             | `Boolean`            | ✓          |
| crossOrigin                                 | [`options.crossOrigin`](https://docs.videojs.com/player#crossorigin)                                             | `String`             | ✓          |
| volume                                      | Used to control the volume of the player, when `volume` changes, the player will adjust the volume in real time. | `Number`             | ✓          |
| playbackRate                                | Used to control the playbackRate of the player.                                                                  | `Number`             | ✓          |
| playbackRates                               | [`options.playbackRates`](https://videojs.com/guides/options/#playbackrates)                                     | `Array<Number>`      | ✓          |
| fluid                                       | [`options.fluid`](https://videojs.com/guides/options/#fluid)                                                     | `Boolean`            | ✓          |
| fill                                        | [`options.fill`](https://videojs.com/guides/options/#fill)                                                       | `Boolean`            | ✓          |
| language                                    | [`options.language`](https://videojs.com/guides/options/#language)                                               | `String`             | ✓          |
| languages                                   | [`options.languages`](https://videojs.com/guides/options/#languages)                                             | `Object`             |            |
| tracks                                      | [`options.tracks`](https://videojs.com/guides/text-tracks/)                                                      | `Array`              | ✓          |
| textTrackSettings                           | [`options.textTrackSettings`](https://docs.videojs.com/texttracksettings)                                        | `Object`             | ✓          |
| responsive                                  | [`options.responsive`](https://videojs.com/guides/options/#responsive)                                           | `Boolean`            | ✓          |
| breakpoints                                 | [`options.breakpoints`](https://videojs.com/guides/options/#breakpoints)                                         | `Object`             | ✓          |
| fullscreen                                  | [`options.fullscreen`](https://videojs.com/guides/options/#fullscreen)                                           | `FullscreenOptions`  |            |
| aspectRatio                                 | [`options.aspectRatio`](https://videojs.com/guides/options/#aspectratio)                                         | `Boolean`            | ✓          |
| liveui                                      | [`options.liveui`](https://videojs.com/guides/options/#liveui)                                                   | `Boolean`            |            |
| liveTracker                                 | [`options.liveTracker`](https://videojs.com/guides/options/#livetrackertrackingthreshold)                        | `Object`             |            |
| disablePictureInPicture                     | [`options.disablePictureInPicture`](https://docs.videojs.com/html5#disablePictureInPicture)                      | `Boolean`            | ✓          |
| notSupportedMessage                         | [`options.notSupportedMessage`](https://videojs.com/guides/options/#notsupportedmessage)                         | `String`             | ✓          |
| normalizeAutoplay                           | [`options.normalizeAutoplay`](https://videojs.com/guides/options/#normalizeautoplay)                             | `Boolean`            | ✓          |
| audioPosterMode                             | [`options.audioPosterMode`](https://videojs.com/guides/options/#audiopostermode)                                 | `Boolean`            | ✓          |
| audioOnlyMode                               | [`options.audioOnlyMode`](https://videojs.com/guides/options/#audioonlymode)                                     | `Boolean`            | ✓          |
| noUITitleAttributes                         | [`options.noUITitleAttributes`](https://videojs.com/guides/options/#nouititleattributes)                         | `Boolean`            |            |
| preferFullWindow                            | [`options.preferFullWindow`](https://videojs.com/guides/options/#preferfullwindow)                               | `Boolean`            |            |
| suppressNotSupportedError                   | [`options.suppressNotSupportedError`](https://videojs.com/guides/options/#suppressnotsupportederror)             | `Boolean`            |            |
| techCanOverridePoster                       | [`options.techCanOverridePoster`](https://videojs.com/guides/options/#techcanoverrideposter)                     | `Boolean`            |            |
| techOrder                                   | [`options.techOrder`](https://videojs.com/guides/options/#techorder)                                             | `Array`              |            |
| inactivityTimeout                           | [`options.inactivityTimeout`](https://videojs.com/guides/options/#inactivitytimeout)                             | `Number`             |            |
| userActions                                 | [`options.userActions`](https://videojs.com/guides/options/#useractions)                                         | `Object`             |            |
| restoreEl                                   | [`options.restoreEl`](https://videojs.com/guides/options/#restoreel)                                             | `Boolean \| Element` |            |
| vtt.js                                      | [`options.vtt.js`](https://videojs.com/guides/options/#vttjs)                                                    | `String`             |            |
| children (Vue) <br> videoJsChildren (React) | [`options.children`](https://videojs.com/guides/options/#children)                                               | `Array \| Object`    |            |
| html5                                       | [`options.html5`](https://videojs.com/guides/options/#html5)                                                     | `Object`             |            |
| plugins                                     | [`options.plugins`](https://videojs.com/guides/options/#plugins)                                                 | `Object`             |            |
| options                                     | A fallback scheme, if you need to use options that don't exist in props, pass them to `options`.                 | `Object`             |            |

### Component Events

For events emitted by Video.js, the parameters are fixed `Event` types, and for events emitted by components, the types are indicated in the table.

| event                 | Video.js API Documentation                                                                                          | Vue                      | React                     |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------- | ------------------------- |
| loadstart             | [`event.loadstart`](https://docs.videojs.com/player#event:loadstart)                                                | `@loadstart`             | `onLoadStart`             |
| suspend               | [`event.suspend`](https://docs.videojs.com/player#event:suspend)                                                    | `@suspend`               | `onSuspend`               |
| abort                 | [`event.abort`](https://docs.videojs.com/player#event:abort)                                                        | `@abort`                 | `onAbort`                 |
| error                 | [`event.error`](https://docs.videojs.com/player#event:error)                                                        | `@error`                 | `onError`                 |
| emptied               | [`event.emptied`](https://docs.videojs.com/player#event:emptied)                                                    | `@emptied`               | `onEmptied`               |
| stalled               | [`event.stalled`](https://docs.videojs.com/player#event:stalled)                                                    | `@stalled`               | `onStalled`               |
| loadedmetadata        | [`event.loadedmetadata`](https://docs.videojs.com/player#event:loadedmetadata)                                      | `@loadedmetadata`        | `onLoadedMetadata`        |
| loadeddata            | [`event.loadeddata`](https://docs.videojs.com/player#event:loadeddata)                                              | `@loadeddata`            | `onLoadedData`            |
| canplay               | [`event.canplay`](https://docs.videojs.com/player#event:canplay)                                                    | `@canplay`               | `onCanPlay`               |
| canplaythrough        | [`event.canplaythrough`](https://docs.videojs.com/player#event:canplaythrough)                                      | `@canplaythrough`        | `onCanPlayThrough`        |
| playing               | [`event.playing`](https://docs.videojs.com/player#event:playing)                                                    | `@playing`               | `onPlaying`               |
| waiting               | [`event.waiting`](https://docs.videojs.com/player#event:waiting)                                                    | `@waiting`               | `onWaiting`               |
| seeking               | [`event.seeking`](https://docs.videojs.com/player#event:seeking)                                                    | `@seeking`               | `onSeeking`               |
| seeked                | [`event.seeked`](https://docs.videojs.com/player#event:seeked)                                                      | `@seeked`                | `onSeeked`                |
| ended                 | [`event.ended`](https://docs.videojs.com/player#event:ended)                                                        | `@ended`                 | `onEnded`                 |
| durationchange        | [`event.durationchange`](https://docs.videojs.com/player#event:durationchange)                                      | `@durationchange`        | `onDurationChange`        |
| timeupdate            | [`event.timeupdate`](https://docs.videojs.com/player#event:timeupdate)                                              | `@timeupdate`            | `onTimeUpdate`            |
| progress              | [`event.progress`](https://docs.videojs.com/player#event:progress)                                                  | `@progress`              | `onProgress`              |
| play                  | [`event.play`](https://docs.videojs.com/player#event:play)                                                          | `@play`                  | `onPlay`                  |
| pause                 | [`event.pause`](https://docs.videojs.com/player#event:pause)                                                        | `@pause`                 | `onpause`                 |
| ratechange            | [`event.ratechange`](https://docs.videojs.com/player#event:ratechange)                                              | `@ratechange`            | `onRateChange`            |
| resize                | [`event.resize`](https://docs.videojs.com/player#event:resize)                                                      | `@resize`                | `onResize`                |
| volumechange          | [`event.volumechange`](https://docs.videojs.com/player#event:volumechange)                                          | `@volumechange`          | `onVolumeChange`          |
| posterchange          | [`event.posterchange`](https://docs.videojs.com/player#event:posterchange)                                          | `@posterchange`          | `onPosterChange`          |
| languagechange        | [`event.languagechange`](https://docs.videojs.com/player#event:languagechange)                                      | `@languagechange`        | `onLanguageChange`        |
| fullscreenchange      | [`event.fullscreenchange`](https://docs.videojs.com/player#event:fullscreenchange)                                  | `@fullscreenchange`      | `onFullscreenChange`      |
| playbackrateschange   | [`event.playbackrateschange`](https://docs.videojs.com/player#event:playbackrateschange)                            | `@playbackrateschange`   | `onPlaybackRatesChange`   |
| controlsdisabled      | [`event.controlsdisabled`](https://docs.videojs.com/player#event:controlsdisabled)                                  | `@controlsdisabled`      | `onControlsDisabled`      |
| controlsenabled       | [`event.controlsenabled`](https://docs.videojs.com/player#event:controlsenabled)                                    | `@controlsenabled`       | `onControlsEnabled`       |
| enterFullWindow       | [`event.enterFullWindow`](https://docs.videojs.com/player#event:enterFullWindow)                                    | `@enterFullWindow`       | `onEnterFullWindow`       |
| exitFullWindow        | [`event.exitFullWindow`](https://docs.videojs.com/player#event:exitFullWindow)                                      | `@exitFullWindow`        | `onExitFullWindow`        |
| enterpictureinpicture | [`event.enterpictureinpicture`](https://docs.videojs.com/player#event:enterpictureinpicture)                        | `@enterpictureinpicture` | `onEnterPictureInPicture` |
| leavepictureinpicture | [`event.leavepictureinpicture`](https://docs.videojs.com/player#event:leavepictureinpicture)                        | `@leavepictureinpicture` | `onLeavePictureInPicture` |
| sourceset             | [`event.sourceset`](https://docs.videojs.com/player#event:sourceset)                                                | `@sourceset`             | `onSourceSet`             |
| texttrackchange       | [`event.texttrackchange`](https://docs.videojs.com/player#event:texttrackchange)                                    | `@texttrackchange`       | `onTextTrackChange`       |
| textdata              | [`event.textdata`](https://docs.videojs.com/player#event:textdata)                                                  | `@textdata`              | `onTextData`              |
| useractive            | [`event.useractive`](https://docs.videojs.com/player#event:useractive)                                              | `@useractive`            | `onUserActive`            |
| userinactive          | [`event.userinactive`](https://docs.videojs.com/player#event:userinactive)                                          | `@userinactive`          | `onUserInactive`          |
| usingcustomcontrols   | [`event.usingcustomcontrols`](https://docs.videojs.com/player#event:usingcustomcontrols)                            | `@usingcustomcontrols`   | `onUsingCustomControls`   |
| usingnativecontrols   | [`event.usingnativecontrols`](https://docs.videojs.com/player#event:usingnativecontrols)                            | `@usingnativecontrols`   | `onUsingNativeControls`   |
| dispose               | [`event.dispose`](https://docs.videojs.com/player#event:dispose)                                                    | `@dispose`               | `onDispose`               |
| beforepluginsetup     | [`event.beforepluginsetup`](https://docs.videojs.com/player#event:beforepluginsetup)                                | `@beforepluginsetup`     | `onBeforePluginSetup`     |
| pluginsetup           | [`event.pluginsetup`](https://docs.videojs.com/player#event:pluginsetup)                                            | `@pluginsetup`           | `onPluginSetup`           |
| componentresize       | [`event.componentresize`](https://docs.videojs.com/player#event:componentresize)                                    | `@componentresize`       | `onComponentResize`       |
| playerresize          | [`event.playerresize`](https://docs.videojs.com/player#event:playerresize)                                          | `@playerresize`          | `onPlayerResize`          |
| tap                   | [`event.tap`](https://docs.videojs.com/player#event:tap)                                                            | `@tap`                   | `onTap`                   |
| ready                 | [`event.ready`](https://docs.videojs.com/player#event:ready)                                                        | `@ready`                 | `onReady`                 |
| mounted               | When player component mounted. <br> `({ video: HTMLVideoElement, player: VideoJsPlayer, state: VideoPlayerState })` | `@mounted`               | `onMounted`               |
| stateChange           | When player state changed (React only). `(state: VideoPlayerState)`                                                 | -                        | `onStateChange`           |

### Player State

The component maintains fully responsive state objects internally so that you can read the player state out of the box outside of the player.

| key                  | description                                | type                        |
| :------------------- | :----------------------------------------- | :-------------------------- |
| src                  | The URL of the currently playing video.    | `String`                    |
| currentSrc           | ditto                                      | `String`                    |
| currentSource        | The currently playing video source Object. | `videojs.Tech.SourceObject` |
| width                | Player's width.                            | `Number`                    |
| height               | Player's height.                           | `Number`                    |
| currentWidth         | ditto                                      | `Number`                    |
| currentHeight        | ditto                                      | `Number`                    |
| videoWidth           | Video element's width.                     | `Number`                    |
| videoHeight          | Video element's height.                    | `Number`                    |
| controls             | -                                          | `Boolean`                   |
| volume               | -                                          | `Number`                    |
| muted                | -                                          | `Boolean`                   |
| poster               | -                                          | `String`                    |
| playing              | -                                          | `Boolean`                   |
| waiting              | -                                          | `Boolean`                   |
| seeking              | -                                          | `Boolean`                   |
| paused               | -                                          | `Boolean`                   |
| ended                | -                                          | `Boolean`                   |
| currentTime          | -                                          | `Number`                    |
| duration             | -                                          | `Number`                    |
| playbackRate         | -                                          | `Number`                    |
| playbackRates        | -                                          | `Array<Number>`             |
| isFullscreen         | -                                          | `Boolean`                   |
| isInPictureInPicture | -                                          | `Boolean`                   |
| isLive               | -                                          | `Boolean`                   |
| language             | -                                          | `String`                    |
| userActive           | -                                          | `Boolean`                   |
| readyState           | -                                          | `videojs.ReadyState`        |
| networkState         | -                                          | `videojs.NetworkState`      |
| error                | -                                          | `MediaError \| Null`        |
| buffered             | -                                          | `videojs.TimeRange`         |
| bufferedPercent      | -                                          | `Number`                    |
| played               | -                                          | `TimeRanges`                |
| seekable             | -                                          | `TimeRanges`                |
| audioTracks          | -                                          | `videojs.AudioTrackList`    |
| videoTracks          | -                                          | `videojs.VidioTrackList`    |
| textTracks           | -                                          | `TextTrackList`             |

### Video.js extension

```javascript
import videojs from 'video.js'

// videojs plugin
const Plugin = videojs.getPlugin('plugin')
class ExamplePlugin extends Plugin {
  // something...
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

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

Licensed under the [MIT](/LICENSE) License.
