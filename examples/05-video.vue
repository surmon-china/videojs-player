<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>rtmp / 直播</span>
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
          <video-player class="vjs-custom-skin" :options="playerOptions">
          </video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  require('videojs-flash')
  export default {
    data() {
      return {
        playerOptions: {
          sources: [{
            type: "rtmp/mp4",
            src: "rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov"
          }],
          techOrder: ['flash'],
          autoplay: true,
          controls: true
        }
      }
    }
  }
</script>

