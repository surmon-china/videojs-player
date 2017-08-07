<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>audio / 音轨</span>
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
                        @ready="playerReadied($event)"></video-player>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  // videojs
  const videojs = require('video.js').default
  export default {
    data() {
      return {
        playerOptions: {
          playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
          sources: [{
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L"
          }],
          poster: "./static/images/author-3.jpg",
          height: 360
        }
      }
    },
    methods: {
      playerReadied(player) {
        var track = new videojs.AudioTrack({
          id: 'my-spanish-audio-track',
          kind: 'translation',
          label: 'Spanish',
          language: 'es'
        })
        player.audioTracks().addTrack(track)
        // Get the current player's AudioTrackList object.
        var audioTrackList = player.audioTracks()

        // Listen to the "change" event.
        audioTrackList.addEventListener('change', function() {

          // Log the currently enabled AudioTrack label.
          for (var i = 0; i < audioTrackList.length; i++) {
            var track = audioTrackList[i]

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
