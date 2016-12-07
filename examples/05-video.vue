<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>HLS Live / 直播</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/05-video.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="item">
        <div class="player">
          <video-player :options="videoOptions" ref="videoPlayer"></video-player>
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
  <video-player :options="videoOptions"></video-player>
</template>

<script>
  export default {
    data() {
      return {
        videoOptions: {
          source: {
            type: "application/x-mpegURL",
            src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8",
            withCredentials: false
          },
          poster: "data:image/png;base64,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",
          live: true,
          autoplay: false
        }
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
            type: "application/x-mpegURL",
            src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8",
            withCredentials: false
          },
          poster: "data:image/png;base64,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",
          live: true,
          autoplay: false
        }
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }
</script>

