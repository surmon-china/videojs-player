<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>AudioTrack && playsinline / 音轨 及 移动端不全屏</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-video-player/tree/master/examples/03-video.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="item">
        <div class="player">
          <video-player class="vjs-custom-skin"
                        :options="playerOptions"
                        :playsinline="true"
                        @ready="playerReadied($event)"></video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  // videojs
  import videojs from 'video.js'

  // export
  export default {
    data() {
      return {
        playerOptions: {
          height: '360',
          playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
          sources: [{
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L"
          }],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-3.jpg",
        }
      }
    },
    methods: {
      playerReadied(player) {
        const track = new videojs.AudioTrack({
          id: 'my-spanish-audio-track',
          kind: 'translation',
          label: 'Spanish',
          language: 'es'
        })
        player.audioTracks().addTrack(track)
        // Get the current player's AudioTrackList object.
        const audioTrackList = player.audioTracks()

        // Listen to the "change" event.
        audioTrackList.addEventListener('change', function() {

          // Log the currently enabled AudioTrack label.
          for (let i = 0; i < audioTrackList.length; i++) {
            const track = audioTrackList[i]
            if (track.enabled) {
              videojs.log(track.label)
              return
            }
          }
        })
      }
    }
  }
</script>
