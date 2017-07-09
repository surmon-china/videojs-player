 /**
 *
 * Vue-Video-Player
 * Adapted from Videojs (https://github.com/videojs/video.js)
 *
 */

window.videojs = require('video.js')
require('video.js/dist/video-js.css')

var playerComponent = require('./player.vue')
playerComponent = playerComponent.default || playerComponent

var videoPlayer = {
  videojs: videojs,
  videoPlayer: playerComponent,
  install: function(Vue) {
    Vue.component(playerComponent.name, playerComponent)
  }
}

module.exports = videoPlayer
