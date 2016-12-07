<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>Youtube / youtube视频</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/06-video.vue">
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
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=iD_MyDbP_ZE"
          },
          defaultSrcReId: "low",
          techOrder: ["youtube"],
          autoplay: false,
          controls: false,
          ytControls: true
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
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=iD_MyDbP_ZE"
          },
          defaultSrcReId: "low",
          techOrder: ["youtube"],
          autoplay: false,
          controls: false,
          ytControls: true
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

