[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/stargazers)
[![Build Status](https://travis-ci.org/surmon-china/vue-video-player.svg?branch=master)](https://travis-ci.org/surmon-china/vue-video-player)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-video-player.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/vue-video-player)

[![NPM](https://nodei.co/npm/vue-video-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-video-player/)
[![NPM](https://nodei.co/npm-dl/vue-video-player.png?months=9&height=3)](https://nodei.co/npm/vue-video-player/)


# Vue-Video-Player

[video.js](https://github.com/videojs/video.js) player component for Vue.

适用于 Vue 的 [video.js](https://github.com/videojs/video.js) 播放器组件。


# Example

[Demo Page](https://surmon-china.github.io/vue-video-player)

[CDN Example](https://jsfiddle.net/u69gnx90/)

[nuxt.js/ssr example code](https://github.com/surmon-china/vue-video-player/blob/master/examples/nuxt-ssr-example)

[More Example Code](https://github.com/surmon-china/vue-video-player/tree/master/examples)


# Install

#### CDN

``` html
<link rel="stylesheet" href="path/to/video.js/dist/video-js.css"/>
<script type="text/javascript" src="path/to/video.min.js"></script>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-video-player.js"></script>
<script type="text/javascript">
  Vue.use(window.VueVideoPlayer)
</script>
```

#### NPM

``` bash
npm install vue-video-player --save
```

### Mount

#### mount with global

``` javascript
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
```

#### mount with component

```javascript
// require styles
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  }
}
```

#### mount with ssr

```javascript
// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  const VueVideoPlayer = require('vue-video-player/dist/ssr')
  Vue.use(VueVideoPlayer)
}
```

#### videojs extend

```javascript
import videojs from 'video.js'

// videojs plugin
const Plugin = videojs.getPlugin('plugin')
class ExamplePlugin extends Plugin {
  // something...
}
videojs.registerPlugin('examplePlugin', ExamplePlugin)

// videojs language
videojs.addLanguage('es', {
  Pause: 'Pausa',
  // something...
})

// more videojs api...

// vue component...
```


### Difference（使用方法的异同）

**SSR and the only difference in the use of the SPA:**
- SPA worked by the `component`, find videojs instance by `ref attribute`.
- SSR worked by the `directive`, find videojs instance by `directive arg`.
- Other configurations, events are the same.


### SPA

``` vue
<template>
  <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"

                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"

                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied">
  </video-player>
</template>

<script>
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  export default {
    data() {
      return {
        playerOptions: {
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "/static/images/author.jpg",
        }
      }
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
  }
</script>
```


### SSR

``` vue
<!-- You can custom the "myVideoPlayer" name used to find the videojs instance in current component -->
<template>
  <div class="video-player-box" 
       @play="onPlayerPlay($event)"
       @pause="onPlayerPause($event)"
       @ready="playerReadied"
       @statechanged="playerStateChanged($event)"
       v-video-player:myVideoPlayer="playerOptions">
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log('this is current videojs instance object', this.myVideoPlayer)
    }
    // Omit the same parts as in the following component sample code
    // ...
  }
</script>
```


# Issues

[videojs-contrib-hls - e is not defined](https://github.com/surmon-china/vue-video-player/issues/90)


# API
- component api:
  * `events` : `[ Array, default: [] ]` : custom videojs event to component
  * `playsinline` : `[ Boolean, default: false ]` : set player not full-screen in mobile device
  * `crossOrigin` : `[ String, default: '' ]` : set crossOrigin to video
  * `customEventName` : `[ String, default: 'statechanged' ]` : custom the state change event name

- video.js api
  * [video.js options](http://docs.videojs.com/tutorial-options.html)
  * [video.js docs](http://docs.videojs.com/)


# videojs plugins

- [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)
- [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
- [videojs-youtube](https://github.com/videojs/videojs-youtube)
- [videojs-vimeo](https://github.com/videojs/videojs-vimeo)
- [videojs-hotkeys](https://github.com/ctd1500/videojs-hotkeys)
- [videojs-flash](https://github.com/videojs/videojs-flash)
- [videojs-contrib-ads](https://github.com/videojs/videojs-contrib-ads)
- [more plugins...](https://github.com/search?o=desc&q=videojs+plugin&s=stars&type=Repositories&utf8=%E2%9C%93)


# Author
[Surmon](https://surmon.me)
