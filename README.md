[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-video-player.svg?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-video-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-video-player/)


# Vue-Video-Player
Video/Live player for Vue.js(1.x ~ 2.x)
基于 [video.js](https://github.com/videojs/video.js) + [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher) + [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls) + [videojs-youtube](https://github.com/videojs/videojs-youtube)

> ### V2.4.5
> ...

> ### V2.4.4
> debug，修复低级bug

> ### V2.4.2
> 优化SPA应用下的销毁方法

> ### V2.4.0
> 重构Example页面，修改获取对象的方式，优化销毁方法，增加自定义事件名称

> ### 之前版本
- [完善]：配置选项
- [增加]：配置选项
- [增加]：可以配置在IOS（非safari）环境下，默认播放是否全屏
- 支持HlS流媒体（.m3u8）直播、各种普通类型视频
- 普通视频可支持多种分辨率切换
- 普通视频可支持多种播放速度切换
- 可根据环境自动降级为flash播放
- 可播放Youtube视频
- 支持Vue.js(1.x ~ 2.x)全版本
- 基于Video.js有丰富的API和文档支持

# Example
[Demo Page](https://surmon-china.github.io/vue-video-player)


# Use Setup


### Install vue-video-player

``` bash
npm install vue-video-player --save
```

``` javascript
// import with ES6
import Vue from 'vue'
import VideoPlayer from 'vue-video-player'

// require with Node.js/Webpack
var Vue = require('vue')
var VideoPlayer = require('vue-video-player')

// The default is to turn off some of the features, you can choose according to their use of certain features enabled, do not enable the introduction will not require the corresponding file.
// 默认有些功能是不开启的，比如youtube国内不能用，则默认是关闭的，如果不启用对应的功能，则不会引入对应的包，减少项目代码体积，当然也有可能意味着对应的功能可能会出错，true 是开启，false是关闭，正常情况使用者不需要care就可以。

// You can configure the global function switch (of course, will be covered by local switches), where non-mandatory
// 可以在这里配置全局的功能开关（当然也会被局部开关给覆盖），这里非必选
VideoPlayer.config({
  youtube: true,  // default false（youtube的支持）
  switcher: true, // default true（播放源切换功能）
  hls: true       // default true（直播功能的支持）
})

// use
Vue.use(VideoPlayer)

// --------------------------------------

// or use with component(ES6)
import Vue from 'vue'
import { videoPlayer } from 'vue-video-player'

// use
export default {
  components: {
    videoPlayer
  }
}
```

``` html
<!-- Use in component(Vue.js1.X && Vue.js2.X) -->
<video-player :options="videoOptions"></video-player>

<!-- Use in component(Vue.js1.X && Vue.js2.X && function switch config) -->
<video-player :options="videoOptions" :config="{ youtube: true }"></video-player>

<!-- Use in component(Vue.js2.X) && event callback -->
<video-player :options="videoOptions" @player-state-changed="playerStateChanged"></video-player>

<!-- Use in component(Vue.js2.X) && custom event name && ref property-->
<video-player :options="videoOptions" @my-player-state-changed-event-custom-name="playerStateChanged" ref="myPlayer"></video-player>
```

``` javascript
// base - player config example
export default {
  data () {
    return {
       videoOptions: {
        source: {
          type: "video/webm",
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
          // if you need custom player state changed event name, you can config it like this
          customEventName: 'my-player-state-changed-event-custom-name'
        }
      }
    }
  }
}

// playbackRates switch and sources switch - player config example
export default {
  data () {
    return {
      videoOptions: {
        source: [
          { type: "video/mp4", src: 'http://example.com/sample_video_H.mp4', label: '原画', res: 1 },
          { type: "video/mp4", src: 'http://example.com/sample_video_M.mp4', label: '高清', res: 2 },
          { type: "video/mp4", src: 'http://example.com/sample_video_L.mp4', label: '流畅', res: 3 }
        ],
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.3, 1.5, 1.7],
        poster: 'http://cn.vuejs.org/images/logo.png',
        defaultSrcReId: 2
      }
    }
  }
}

// live - player config example
export default {
  data () {
    return {
       videoOptions: {
        source: {
          type: 'application/x-mpegURL',
          src: 'https://example.net/live/playlist.m3u8',
          withCredentials: false
        },
        live: true
      }
    }
  }
}

// youtube - player config example
export default {
  data () {
    return {
      videoOptions: {
        source: {
          type: "video/youtube",
          src: "https://www.youtube.com/watch?v=iD_MyDbP_ZE"
        },
        techOrder: ["youtube"],
        autoplay: false,
        controls: false,
        ytControls: true
      }
    }
  }
}

//-------------------------------------------------------------
// player state changed callback event

// events with Vue.js1.x
export default {
  events: {
    playerStateChanged(playerCurrentState) {
      console.log(playerCurrentState)
    }
  }
}

// methods with Vue.js2.x
export default {
  methods: {
    playerStateChanged(playerCurrentState) {
      console.log(playerCurrentState)
    }
  }
}

//-------------------------------------------------------------
// get current player object in parent component

export default {
  computed: {
    player() {
      return this.$refs.myPlayer.player
    }
  },
  mounted: {
    console.log('this is current player object', this.player)
    this.player.pause()
    // and do something...
  }
}
```

[More Code Example](https://surmon-china.github.io/vue-video-player)


# API

| protype        | type | description | example |
| :------------- |:---------------|:---------------| :------ |
| playsinline    | Boolean      |  the player default play auto fullscreen in IOS(!safari) (Y/n) default: true |       |
| source         | Object/Array |  the player source src(required) |       |
| muted          | Boolean      |  default: false                     |       |
| autoplay       | Boolean      |  default: true                    |       |
| start          | Number       |  player start time(default: 0)  |       |
| live           | Boolean      |  player is live? |
| playbackRates  | Array        |  player play backrates | [0.7, 1.0, 1.3, 1.5, 1.7] |
| defaultSrcReId | Number       |  When there are multiple sources, used to specify the default source (default:　1) |
| controls       | Boolean      |  player controls display or hidden |
| preload        | Boolean      |  player preload ? |
| poster         | String       |  player poster(default: '') | 'http://adasd.jpg' / 'data:image/png;base64,iVB...' |
| width          | Number       |  player width (default: 100%) |
| height         | Number       |  player height (default: 360) |
| controlBar     | Object       |  player controlBar dsipaly config | need to video.js api doc
| language       | String       |  player language(default: 'en') |
| techOrder      | Array        |  player support video type (default: example) | ['html5', 'flash', 'youtube'] |
| customEventName| String       |  player state changed event name (default: example) | 'player-state-changed' |


# Credits

[video.js](https://github.com/videojs/video.js)

[video.js api](http://docs.videojs.com/docs/api/player.html#Methodsmuted)

[videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)

[videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)

[videojs-youtube](https://github.com/videojs/videojs-youtube)


# Author Blog
[Surmon](http://surmon.me)
