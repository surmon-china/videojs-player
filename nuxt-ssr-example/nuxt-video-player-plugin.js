
import Vue from 'vue'

if (process.BROWSER_BUILD) {
	const VueVideoPlayer = require('vue-video-player/ssr')
	Vue.use(VueVideoPlayer)
}
