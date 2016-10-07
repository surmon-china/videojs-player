 /**
 *
 * Vue-Video-Player
 * Adapted from Videojs (https://github.com/samthor/rippleJS)
 *
 */

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