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

[CDN Example](https://surmon-china.github.io/vue-video-player)


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











# Example

[Demo Page](https://surmon-china.github.io/vue-video-player)

[CDN Example](https://jsfiddle.net/kqaew65x/)

[mobile fullpage example code](https://github.com/surmon-china/vue-video-player/blob/master/examples/44-mobile-fullpage-example.vue)

[nuxt.js/ssr example code](https://github.com/surmon-china/vue-video-player/blob/master/examples/nuxt-ssr-example)


# Install

#### CDN

``` html
<link rel="stylesheet" href="path/to/video.js/dist/video-js.css"/>
<script type="text/javascript" src="path/to/video-js.js"></script>
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

// require styles
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer, /* { default global options } */)
```

#### mount with component

```javascript
// require styles
import 'video.js/dist/video-js.css'

import { swiper, swiperSlide } from 'vue-video-player'

export default {
  components: {
    swiper,
    swiperSlide
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

#### custom swiper plugin

```javascript
import Swiper from 'swiper'
Swiper.use({
  name: 'pluginName',
  params: {
    pluginSwitch: false,
  },
  on: {
    init() {
      if (!this.params.pluginSwitch) return
      console.log('init')
    },
    // swiper callback...
  }
})
```


### Difference（使用方法的异同）

**SSR and the only difference in the use of the SPA:**
- SPA worked by the `component`, find swiper instance by `ref attribute`.
- SSR worked by the `directive`, find swiper instance by `directive arg`.
- Other configurations, events are the same.


### SSR

```vue
<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->
<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banners: [ '/1.jpg', '/2.jpg', '/3.jpg' ],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          // some swiper options...
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.banners.push('/4.jpg')
        console.log('banners update')
      }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper, 
        'It will slideTo banners 3')
      this.mySwiper.slideTo(3, 1000, false)
    }
  }
</script>
```


### SPA

```vue
<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
```

### Async data example

```vue
<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
  }
</script>
```


# API
Swiper's API and configuration can be used.（Swiper官网中的API及配置均可使用）
- [CN Swiper4 documents](http://www.swiper.com.cn/api/index2.html)
- [EN Swiper4 documents](http://idangero.us/swiper/api/)


# Author
[Surmon](https://surmon.me)
