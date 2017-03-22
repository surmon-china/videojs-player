<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>Youtube / youtube视频</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-video-player/tree/master/examples/05-video.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="item">
        <div class="player">
          <video-player :options="playerOptions"></video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  require('videojs-youtube')
  require('videojs-contrib-hls/dist/videojs-contrib-hls')
  export default {
    data() {
      return {
        playerOptions: {
          sources: [{
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=iD_MyDbP_ZE"
          }],
          plugins: {
            videoJsResolutionSwitcher: {
              default: 'low',
              dynamicLabel: true
            }
          },
          techOrder: ['youtube'],
          autoplay: false,
          controls: false,
          youtube: {
            ytControls: 2,
            customVars: { 
              wmode: 'transparent' 
            }
          }
        }
      }
    }
  }
</script>

