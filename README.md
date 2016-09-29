[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-video-player.svg?style=flat-square)](https://github.com/surmon-china/vue-video-player/stargazers)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-video-player.svg?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-video-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-video-player/)


# Vue-Video-Player
Video/Live player for Vue.js
<<<<<<< HEAD
基于 [video.js](https://github.com/videojs/video.js) + [videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher) + [videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)

=======
>>>>>>> c8bf70f1e5d572f15e8b82d142c12f716667b938

## V1.0.0

  - 支持Hls格式直播、录播类型视频
  - 录播视频支持多种分辨率切换
  - 录播视频支持播放速度切换
  - 可根据环境自动降级为flash播放

# Example
<<<<<<< HEAD
[Demo](https://surmon-china.github.io/vue-video-player)
=======
[Demos](https://surmon-china.github.io/vue-video-player)
>>>>>>> c8bf70f1e5d572f15e8b82d142c12f716667b938


# Use Setup

``` bash
# install vue-video-player
npm install vue-video-player --save


# Vue use

## import with ES6
import Vue from 'vue'
...
import VideoPlayer from 'vue-video-player'


<<<<<<< HEAD
## require with Node.js/Webpack
=======
## require with Webpack
>>>>>>> c8bf70f1e5d572f15e8b82d142c12f716667b938
var Vue = require('vue')
...
var VideoPlayer = require('vue-video-player')

## use
Vue.use(VideoPlayer)


# use in components
<video-player :options="videoOptions"></video-player>


<<<<<<< HEAD
# component config example 1(video)
data () {
  return {
     videoOptions: {
      source: {
        type: "video/webm", 
        src: 'http://techslides.com/demos/sample-videos/small.webm',
        muted: true
      }
=======
# component config example 1
data () {
  return {
     videoOptions: {
      src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_M.mp4'
>>>>>>> c8bf70f1e5d572f15e8b82d142c12f716667b938
    }
  }
}


<<<<<<< HEAD
# component config example 2(video)
data () {
  return {
    videoOptions: {
      source: [
        { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_H.mp4', label: '原画', res: 1 },
        { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_M.mp4', label: '高清', res: 2 },
        { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_L.mp4', label: '流畅', res: 3 }
=======
# component config example 2
data () {
  return {
    videoOptions: {
      src: [
        { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_M.mp4', label: '原画', res: 1 },
        { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_M.mp4', label: '高清', res: 2 },
        { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_M.mp4', label: '流畅', res: 3 }
>>>>>>> c8bf70f1e5d572f15e8b82d142c12f716667b938
      ],
      language: 'zh-CN',
      playbackRates: [0.7, 1.0, 1.3, 1.5, 1.7],
      poster: 'http://cn.vuejs.org/images/logo.png',
      defaultSrcReId: 2
    }
  }
}

<<<<<<< HEAD
# component config example 3(live)
data () {
  return {
     videoOptions: {
      source: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_live_video.hls',
      live: true
    }
  }
}

实际效果Look [Demo](https://surmon-china.github.io/vue-video-player)


```

# API

稍后补充


[video.js api](http://docs.videojs.com/docs/api/player.html#Methodsmuted)

# More Config

[video.js](https://github.com/videojs/video.js)

[video.js api](http://docs.videojs.com/docs/api/player.html#Methodsmuted)
=======
```

# 全部 API



# More Config

[https://github.com/videojs/video.js](https://github.com/videojs/video.js)
>>>>>>> c8bf70f1e5d572f15e8b82d142c12f716667b938

[videojs-resolution-switcher](https://github.com/kmoskwiak/videojs-resolution-switcher)

[videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)


# Author Blog
[Surmon](http://surmon.me)
