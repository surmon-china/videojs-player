<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>Only Flash && custom event name / 仅使用Flash模式播放 && 自定义事件名称</span>
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
          <video-player :options="videoOptions" @state="playerStateChanged" ref="videoPlayer"></video-player>
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
  <video-player :options="videoOptions" @state="playerStateChanged" ref="videoPlayer"></video-player>
</template>

<script>
  export default {
    data() {
      return {
        videoOptions: {
          source: {
            type: "video/mp4",
            src: "http://vjs.zencdn.net/v/oceans.mp4"
          },
          techOrder: ["flash"],
          poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
          autoplay: false,
          customEventName: 'state'
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
            src: "http://vjs.zencdn.net/v/oceans.mp4"
          },
          techOrder: ["flash"],
          poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
          autoplay: false,
          customEventName: 'state'
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
        console.log(playerCurrentState)
      }
    }
  }
</script>

