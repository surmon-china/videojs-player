 /**
 *
 * Vue-Video-Player
 * Adapted from Videojs (https://github.com/videojs/video.js)
 *
 */

window.videojs = require('video.js')
require('video.js/dist/alt/video-js-cdn.css')
videojs.options.flash.swf = "https://cdn.bootcss.com/video.js/5.13.0/video-js.swf"
var player = require('./player.vue')
var videoPlayerBuild = function(Vue) {
  // videoPlayer.config()
  Vue.component('video-player', player)
}
var videoPlayer = {
  videoPlayer: player,
  config: function(configs) {
    if (!configs) return
    configs.hls = configs.hls !== undefined ? configs.hls : true
    configs.switcher = configs.switcher !== undefined ? configs.switcher : true
    if (configs.hls) require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
    if (configs.youtube) require('videojs-youtube')
    if (configs.switcher) require('videojs-resolution-switcher')
  },
  install: function(Vue) {
    videoPlayer.config({})
    videoPlayerBuild(Vue)
  }
}

module.exports = videoPlayer
