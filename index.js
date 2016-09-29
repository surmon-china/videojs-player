 /**
 *
 * Vue-Video-Player
 * Adapted from Videojs (https://github.com/samthor/rippleJS)
 *
 */

var component = require('./component.vue')

var videoPlayerBuild = function(Vue) {

  // component
  Vue.component('video-player', component)
}

var videoPlayer = {
  install: function(Vue) {
    videoPlayerBuild(Vue)
  }
}

module.exports = videoPlayer