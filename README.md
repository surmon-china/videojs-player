[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-video-player.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/vue-video-player)

[![NPM](https://nodei.co/npm/vue-video-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-video-player/)
[![NPM](https://nodei.co/npm-dl/vue-video-player.png?months=9&height=3)](https://nodei.co/npm/vue-video-player/)


# Vue-Video-Player
[Video.js](https://github.com/videojs/video.js) player component for Vue.


# Update
Updated to video.js 6+.

# Example
[Demo Page](https://surmon-china.github.io/vue-video-player)


# Use Setup

### Install vue-video-player

``` bash
npm install vue-video-player --save
```

### Vue mount

``` javascript
// require videojs style [and custom videojs theme]
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


// import
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'


// or require
var Vue = require('vue')
var VueVideoPlayer = require('vue-video-player')


// mount with global
Vue.use(VueVideoPlayer)


// If used in Nuxt.js/SSR, you should keep it only in browser build environment
if (process.browser) {
  const VueVideoPlayer = require('vue-video-player/ssr')
  Vue.use(VueVideoPlayer)
}

// If you need to use more videojs extensions, you can introduce the corresponding videojs plug-in package before the vue program is instantiated, such as:
const { videojs } = VueVideoPlayer
videojs.plugin('myPlugin', myPluginFunction)
videojs.addLanguage('ml', myLanguageObject)
videojs.registerPlugin('examplePlugin', examplePlugin)
// videojs.[methods]...

// or require videojs (plugins || langs || ...)
require('video.js/dist/lang/ba')
require('videos-some-plugins')
require('videos...')

// mount with component(can't work in Nuxt.js/SSR)
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  }
}
```


### Use the difference（使用方法的区别）

*SSR and the only difference in the use of the SPA:*
- SPA worked by  `component`, find videojs instance by `ref attribute`.
- SSR worked by  `directive`, find videojs instance by `directive arg`.
- Other configurations, events are the same.

### Use in SSR

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


### Use in SPA

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
  // require('some-videojs-plugin')
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


[More Example Code](https://github.com/surmon-china/vue-video-player/tree/master/examples)


# API
- component api:
  * playsinline(boolean, default: false): set player not full-screen in mobile device
  * customEventName(string, default: 'statechanged'): custom the state change event name

- video.js api
  * [video.js api](http://docs.videojs.com/docs/api/player.html#Methodsmuted)
  * [video.js docs](http://docs.videojs.com/#)


# Credits
- [video.js](https://github.com/videojs/video.js)


# Videojs plugins

- [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)
- [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
- [videojs-youtube](https://github.com/videojs/videojs-youtube)
- [videojs-vimeo](https://github.com/videojs/videojs-vimeo)
- [videojs-hotkeys](https://github.com/ctd1500/videojs-hotkeys)
- [videojs-flash](https://github.com/videojs/videojs-flash)
- [videojs-contrib-ads](https://github.com/videojs/videojs-contrib-ads)
- [more plugins...](https://github.com/search?o=desc&q=videojs+plugin&s=stars&type=Repositories&utf8=%E2%9C%93)

# License

Licensed under either of

 * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)
 * GNU General Public License, version 3 ([LICENSE-GPL](LICENSE-GPL) or https://opensource.org/licenses/GPL-3.0)

at your option.

# Author Blog
[Surmon](https://surmon.me)
