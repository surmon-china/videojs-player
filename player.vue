<template>
  <div class="video-player">
    <video class="video-js vjs-custom-skin"></video>
  </div>
</template>

<script>
  window.videojs = require('video.js')
  require('video.js/dist/video-js.css')
  var languages = require('./languages.js')
  export default {
    name: 'video-player',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    mounted() {
      if (!this.player) { 
        this.initialize()
      }
    },
    beforeDestroy() {
      if (this.player) { 
        this.dispose()
      }
    },
    methods: {
      initialize() {

        // init
        var self = this
        this.player = null

        // options
        var videoOptions = Object.assign({

          // component options
          start: 0,
          playsinline: false,
          customEventName: 'statechanged',

          // videojs options
          autoplay: false,
          controls: true,
          preload: 'auto',
          fluid: false,
          muted: false,
          width: '100%',
          height: '360',
          language: 'en',
          controlBar: {
            remainingTimeDisplay: false,
            playToggle: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeMenuButton: {
              inline: false,
              vertical: true
            }
          },
          techOrder: ['html5', 'flash'],
          playbackRates: [],
          plugins:{}
        }, this.options)

        // check sources
        /*
        if (!videoOptions.sources || !videoOptions.sources.length) {
          console.warn('Missing required option: "sources".')
          return false
        }
        */

        // add language
        var language = videoOptions.language
        videojs.addLanguage(language, languages[language])

        // ios fullscreen
        var playsinline = videoOptions.playsinline
        if (playsinline) {
          this.$el.children[0].setAttribute('playsinline', playsinline)
          this.$el.children[0].setAttribute('webkit-playsinline', playsinline)
        }

        // emit event
        var emitPlayerState = function (event, value) {
          if (event) {
            self.$emit(event, self.player)
          }
          if (value) {
            var values = {}
            values[event] = value
            self.$emit(videoOptions.customEventName, values)
          }
        }

        // videoOptions
        // console.log(videoOptions)

        // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
        delete videoOptions.plugins.__ob__;
        this.player = videojs(this.$el.children[0], videoOptions, function() {

          // player readied
          self.$emit('ready', self.player)

          this.on('loadeddata', function() {
            this.muted(videoOptions.muted)
            this.currentTime(videoOptions.start)
            emitPlayerState('loadeddata', true)
          })

          this.on('canplay', function() {
            emitPlayerState('canplay', true)
          })

          this.on('canplaythrough', function() {
            emitPlayerState('canplaythrough', true)
          })

          this.on('play', function() {
            emitPlayerState('play', true)
          })

          this.on('pause', function() {
            emitPlayerState('pause', true)
          })

          this.on('waiting', function() {
            emitPlayerState('waiting', true)
          })

          this.on('playing', function() {
            emitPlayerState('playing', true)
          })

          this.on('ended', function() {
            emitPlayerState('ended', true)
          })

          this.on('timeupdate', function() {
            emitPlayerState('timeupdate', this.currentTime())
          })
        })
      },
      dispose() {
        if (this.player && videojs) {
          this.player.pause && this.player.pause()
          videojs(this.$el.children[0]).dispose()
          if (!this.$el.children.length) {
            var video = document.createElement('video')
            video.className = 'video-js vjs-custom-skin'
            this.$el.appendChild(video)
          }
          this.player = null
        }
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options, oldOptions) {
          this.dispose()
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        }
      }
    }
  }
</script>

<style src="./player.css"></style>
