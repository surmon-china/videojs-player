<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>Only Flash & custom event name & hotkeys plugin / 仅使用Flash模式播放 & 自定义事件名称 & 热键插件</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-video-player/tree/master/examples/02-video.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="item">
        <div class="player">
          <video-player :options="playerOptions" 
                        @ready="playerIsReady"
                        @changed="playerStateChanged($event)" 
                        ref="videoPlayer">
          </video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  // hotkeys plugin
  require('videojs-hotkeys')
  export default {
    data() {
      return {
        playerOptions: {
          // component options
          customEventName: 'changed',

          // component options
          autoplay: false,
          sources: [{
            type: "video/mp4",
            src: "http://vjs.zencdn.net/v/oceans.mp4"
          }],
          language: 'zh-CN',
          techOrder: ['flash'],
          poster: "/vue-video-player/static/images/author-2.jpg"
        }
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      playerStateChanged(playerCurrentState) {
        // console.log('example 2: state changed', playerCurrentState)
      },
      playerIsReady(player) {
        console.log('example 2 ready!', player)
        player.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false
        })
      }
    }
  }
</script>

