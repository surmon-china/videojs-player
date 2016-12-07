<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>playbackRate switch && source switch / 播放速度切换 && 播放源切换</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/04-video.vue">
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
          source: [{
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_H",
            label: "原画",
            res: 1
          },{
            type: "video/mp4",
            src: "http://221.11.100.42/7xkwa7.media1.z0.glb.clouddn.com/sample_video_M?wsiphost=local",
            label: "高清",
            res: 2
          },{
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L",
            label: "流畅",
            res: 3
          }],
          language: "zh-CN",
          playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
          poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
          defaultSrcReId: 2,
          height: 360,
          autoplay: true
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
          source: [{
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_H",
            label: "原画",
            res: 1
          },{
            type: "video/mp4",
            src: "http://221.11.100.42/7xkwa7.media1.z0.glb.clouddn.com/sample_video_M?wsiphost=local",
            label: "高清",
            res: 2
          },{
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L",
            label: "流畅",
            res: 3
          }],
          language: "zh-CN",
          playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
          poster: "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
          defaultSrcReId: 2,
          height: 360,
          autoplay: true
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
