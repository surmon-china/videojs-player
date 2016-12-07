<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>Base Config / 基本示例</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-video-player/tree/master/examples/01-video.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="item">
        <div class="player">
          <video-player :options="videoOptions" @player-state-changed="playerStateChanged" ref="videoPlayer"></video-player>
        </div>
        <div class="codemirror">
          <codemirror v-model="code" :options="editorOption"></codemirror>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
const code =
`<template>
  <video-player :options="videoOptions" @player-state-changed="playerStateChanged"></video-player>
</template>

<script>
  export default {
    data() {
      return {
        videoOptions: {
          source: {
            type: "video/mp4",
            src: "http://assets7.ign.com/videos/zencoder/2016/06/15/960/7080c56a76e2b74ec8ecfe4c224441d4-1500000-1466028542-w.mp4"
          },
          poster: "http://assets1.ignimgs.com/thumbs/userUploaded/2016/6/15/zelda-1466028489388_large.jpg",
          autoplay: false,
          muted: false
        }
      }
    },
    methods: {
      playerStateChanged(playerCurrentState) {
        console.log(playerCurrentState)
      }
    }
  }
<\/script>`
  export default {
    data() {
      return {
        code,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldGutter: true,
          styleSelectedText: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          mode: 'text/x-vue',
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "base16-dark"
        },
        videoOptions: {
          source: {
            type: "video/mp4",
            src: "http://assets7.ign.com/videos/zencoder/2016/06/15/960/7080c56a76e2b74ec8ecfe4c224441d4-1500000-1466028542-w.mp4"
          },
          poster: "http://assets1.ignimgs.com/thumbs/userUploaded/2016/6/15/zelda-1466028489388_large.jpg",
          autoplay: false,
          muted: false
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
        // console.log(playerCurrentState)
      }
    }
  }
</script>

