<template>
  <section class="container">
    <div class="video-player-box"
         :playsinline="playsinline"
         @play="onPlayerPlay($event)"
         @pause="onPlayerPause($event)"
         @ended="onPlayerEnded($event)"
         @loadeddata="onPlayerLoadeddata($event)"
         @waiting="onPlayerWaiting($event)"
         @playing="onPlayerPlaying($event)"
         @timeupdate="onPlayerTimeupdate($event)"
         @canplay="onPlayerCanplay($event)"
         @canplaythrough="onPlayerCanplaythrough($event)"
         @ready="playerReadied"
         @statechanged="playerStateChanged($event)"
         v-video-player:myVideoPlayer="playerOptions">
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        // component options
        playsinline: true,
        
        // videojs options
        playerOptions: {
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          // poster: "/static/images/author.jpg",
        }
      }
    },
    mounted() {
      console.log('this is current player instance object', this.myVideoPlayer)
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },

      // or listen state event
      playerStateChanged(playerCurrentState) {
        console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('example 01: the player is readied', player)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;

    .video-player-box {
      min-height: 200px;
    }
  }
</style>
