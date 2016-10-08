 /**
 *
 * Vue-Video-Player
 * Adapted from Videojs (https://github.com/videojs/video.js)
 *
 */

window.videojs = require('video.js')
require('videojs-youtube')
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
require('videojs-resolution-switcher')
require('video.js/dist/alt/video-js-cdn.css')
videojs.options.flash.swf = "https://cdn.bootcss.com/video.js/5.13.0/video-js.swf"

var player = require('./player.vue')

var videoPlayerBuild = function(Vue) {
  // component
  Vue.component('video-player', player)
}

var videoPlayer = {
  videoPlayer: player,
  install: function(Vue) {
    videoPlayerBuild(Vue)
  }
}

module.exports = videoPlayer