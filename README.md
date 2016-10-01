[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-video-player.svg?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-video-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-video-player/)


# Vue-Video-Player
Video/Live player for Vue.js
基于 [video.js](https://github.com/videojs/video.js) + [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher) + [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)

- 支持HlS流媒体（.m3u8）直播、各种普通类型视频
- 普通视频可支持多种分辨率切换
- 普通视频可支持多种播放速度切换
- 可根据环境自动降级为flash播放
- 可播放Youtube视频

# Example
[Demo](https://surmon-china.github.io/vue-video-player)


# Use Setup

``` bash
# install vue-video-player
npm install vue-video-player --save
```

``` javascript
// import with ES6
import Vue from 'vue'
...
import VideoPlayer from 'vue-video-player'


// require with Node.js/Webpack
var Vue = require('vue')
...
var VideoPlayer = require('vue-video-player')

// use
Vue.use(VideoPlayer)
```

``` html
<!-- Use in components -->
<video-player :options="videoOptions"></video-player>
```

``` javascript
// component config example 1(video)
data () {
  return {
     videoOptions: {
      source: {
        type: "video/webm", 
        src: 'http://techslides.com/demos/sample-videos/small.webm'
      },
      techOrder: ['flash']
    }
  }
}


// component config example 2(video)
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

// component config example 3(live)
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
```

[More Code Example](https://surmon-china.github.io/vue-video-player)


# API

| protype        | type | description | example |
| :------------- |:---------------|:---------------| :------ |
| source         | Object/Array |  the player source src(required) |       |
| muted          | Boolean      |  default: false                     |       |
| autoplay       | Boolean      |  default: true                    |       |
| start          | Number       |  player start time(default: 0)  |       |
| live           | Boolean      |  player is live? |
| playbackRates  | Array        |  player play backrates | [0.7, 1.0, 1.3, 1.5, 1.7] |
| defaultSrcReId | Number       |  当有多个资源时，用于指定默认播放哪一种（分辨率）资源(default:　1) |
| controls       | Boolean      |  player controls display or hidden |
| preload        | Boolean      |  player preload ? |
| poster         | String       |  player poster(default: '') | 'http://adasd.jpg' / 'data:image/png;base64,iVB...' |
| wdith          | Number       |  player width (default: 100%) |
| height         | Number       |  player width (height: 360) |
| controlBar     | Object       |  player controlBar dsipaly config | need to video.js api doc
| language       | String       |  player language(default: 'en') |
| techOrder      | Array        |  player support video type (default: example) | ['html5', 'flash', 'youtube'] | 



# Credits

[video.js](https://github.com/videojs/video.js)

[video.js api](http://docs.videojs.com/docs/api/player.html#Methodsmuted)

[videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)

[videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)


# Author Blog
[Surmon](http://surmon.me)
