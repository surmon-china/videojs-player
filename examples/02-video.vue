<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>Custom event name & hotkeys plugin & flash plugin / Flash插件 & 自定义事件名称 & 热键插件</span>
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
          <video-player class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        customEventName="changed"
                        @ready="playerIsReady"
                        @changed="playerStateChanged($event)">
          </video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  // custom skin css
  import '../src/custom-theme.css'

  // videojs hotkeys plugin
  import 'videojs-flash'
  import 'videojs-hotkeys'

  // export
  export default {
    data() {
      return {
        playerOptions: {
          height: '360',
          autoplay: false,
          sources: [{
            // mp4
            // type: 'video/mp4',
            // src: 'http://vjs.zencdn.net/v/oceans.mp4',
            // flv
            type: 'video/x-flv',
            src: 'http://fms.cntv.lxdns.com/live/flv/channel96.flv'
          }],
          language: 'zh-CN',
          techOrder: ['flash'],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-6.jpg"
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
        console.log('example 2: state changed', playerCurrentState)
      },
      playerIsReady(player) {
        console.log('example 2 ready!', player)
        player.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false,
          fullscreenKey: function(event, player) {
            // override fullscreen to trigger when pressing the F key or Ctrl+Enter
            return ((event.which === 70) || (event.ctrlKey && event.which === 13));
          }
        })
      }
    }
  }
</script>

