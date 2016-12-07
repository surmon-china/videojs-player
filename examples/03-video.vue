<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>playbackRate / 播放速度切换</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/03-video.vue">
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
            type: "video/webm",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          },
          playbackRates: [0.5, 1, 1.5, 2],
          poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
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
            type: "video/webm",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          },
          playbackRates: [0.5, 1, 1.5, 2],
          poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
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

