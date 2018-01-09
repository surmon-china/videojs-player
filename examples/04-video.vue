<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>HLS Live / 直播</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-video-player/tree/master/examples/04-video.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="item">
        <div class="player">
          <video-player class="vjs-custom-skin" 
                        :options="playerOptions" 
                        @ready="playerReadied">
          </video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  // custom skin css
  import '../src/custom-theme.css'

  // videojs
  import videojs from 'video.js'
  window.videojs = videojs

  // hls plugin for videojs6
  require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

  // export
  export default {
    data() {
      return {
        playerOptions: {
          // videojs and plugin options
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg"
        }
      }
    },
    methods: {
      playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options
        }
      }
    }
  }
</script>

