
/*
* Vue-Video-Player ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-video-player
* Adapted from Videojs (https://github.com/videojs/video.js)
*/

import _videojs from 'video.js'
import videoPlayer from './player.vue'

const videojs = window.videojs || _videojs
const install = function (Vue, config) {
  if (config) {
    if (config.options) {
      videoPlayer.props.globalOptions.default = () => config.options
    }
    if (config.events) {
      videoPlayer.props.globalEvents.default = () => config.events
    }
  }
  Vue.component(videoPlayer.name, videoPlayer)
}

const VueVideoPlayer = { videojs, videoPlayer, install }

export default VueVideoPlayer
export { videojs, videoPlayer, install }
