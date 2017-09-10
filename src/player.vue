<template>
  <div class="video-player">
    <video class="video-js"></video>
  </div>
</template>

<script>
  window.videojs = require('video.js')
  videojs = videojs.default || videojs
  export default {
    name: 'video-player',
    props: {
      options: {
        type: Object,
        required: true
      },
      start: {
        type: Number,
        default: function() {
          return 0
        }
      },
      playsinline: {
        type: Boolean,
        default: function() {
          return false
        }
      },
      customEventName: {
        type: String,
        default: function() {
          return 'statechanged'
        }
      }
    },
    mounted: function() {
      if (!this.player) { 
        this.initialize()
      }
    },
    beforeDestroy: function() {
      if (this.player) { 
        this.dispose()
      }
    },
    methods: {
      initialize: function() {

        // init
        var self = this
        this.player = null

        // videojs options
        var videoOptions = Object.assign({
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
          techOrder: ['html5'],
          plugins:{}
        }, this.options)

        // check sources
        /*
        if (!videoOptions.sources || !videoOptions.sources.length) {
          console.warn('Missing required option: "sources".')
          return false
        }
        */

        // ios fullscreen
        var playsinline = this.playsinline
        if (playsinline) {
          this.$el.children[0].setAttribute('playsinline', playsinline)
          this.$el.children[0].setAttribute('webkit-playsinline', playsinline)
        }

        // emit event
        var emitPlayerState = function(event, value) {
          if (event) {
            self.$emit(event, self.player)
          }
          if (value) {
            var values = {}
            values[event] = value
            self.$emit(self.customEventName, values)
          }
        }

        // videoOptions
        // console.log(videoOptions)

        // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
        if (videoOptions.plugins) {
          delete videoOptions.plugins.__ob__
        }
        
        this.player = videojs(this.$el.children[0], videoOptions, function() {

          // player readied
          var _this = this
          self.$emit('ready', self.player)

          // events
          var events = ['loadeddata',
                        'canplay', 
                        'canplaythrough', 
                        'play', 
                        'pause', 
                        'waiting', 
                        'playing', 
                        'ended',
                        'error']
          for (var i = 0; i < events.length; i++) {
            (function(event) {
              _this.on(event, function() {
                emitPlayerState(event, true)
              })
            })(events[i])
          }

          this.on('timeupdate', function() {
            emitPlayerState('timeupdate', this.currentTime())
          })
        })
      },
      dispose: function() {
        if (this.player && videojs) {
          this.player.pause && this.player.pause()
          videojs(this.$el.children[0]).dispose()
          if (!this.$el.children.length) {
            var video = document.createElement('video')
            video.className = 'video-js'
            this.$el.appendChild(video)
          }
          this.player = null
        }
      }
    },
    watch: {
      options: {
        deep: true,
        handler: function (options, oldOptions) {
          this.dispose()
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        }
      }
    }
  }
</script>
