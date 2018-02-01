<template>
  <div class="video-player" v-if="reseted">
    <video class="video-js" ref="video"></video>
  </div>
</template>

<script>
  // lib
  import _videojs from 'video.js'
  const videojs = window.videojs || _videojs

  // pollfill
  if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
      value(target, varArgs) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object')
        }
        const to = Object(target)
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index]
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey]
              }
            }
          }
        }
        return to
      },
      writable: true,
      configurable: true
    })
  }

  // as of videojs 6.6.0
  const DEFAULT_EVENTS = [
    'loadeddata',
    'canplay',
    'canplaythrough',
    'play',
    'pause',
    'waiting',
    'playing',
    'ended',
    'error'
  ]

  // export
  export default {
    name: 'video-player',
    props: {
      start: {
        type: Number,
        default: 0
      },
      crossOrigin: {
        type: String,
        default: ''
      },
      playsinline: {
        type: Boolean,
        default: false
      },
      customEventName: {
        type: String,
        default: 'statechanged'
      },
      options: {
        type: Object,
        required: true
      },
      events: {
        type: Array,
        default: () => []
      },
      globalOptions: {
        type: Object,
        default: () => ({
          // autoplay: false,
          controls: true,
          // preload: 'auto',
          // fluid: false,
          // muted: false,
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
          plugins: {}
        })
      },
      globalEvents: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        player: null,
        reseted: true
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

        // videojs options
        const videoOptions = Object.assign({}, this.globalOptions, this.options)

        // ios fullscreen
        if (this.playsinline) {
          this.$refs.video.setAttribute('playsinline', this.playsinline)
          this.$refs.video.setAttribute('webkit-playsinline', this.playsinline)
          this.$refs.video.setAttribute('x5-playsinline', this.playsinline)
          this.$refs.video.setAttribute('x5-video-player-type', 'h5')
          this.$refs.video.setAttribute('x5-video-player-fullscreen', false)
        }

        // cross origin
        if (this.crossOrigin !== '') {
          this.$refs.video.crossOrigin = this.crossOrigin
          this.$refs.video.setAttribute('crossOrigin', this.crossOrigin)
        }

        // emit event
        const emitPlayerState = (event, value) => {
          if (event) {
            this.$emit(event, this.player)
          }
          if (value) {
            this.$emit(this.customEventName, { [event]: value })
          }
        }

        // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
        if (videoOptions.plugins) {
          delete videoOptions.plugins.__ob__
        }

        // videoOptions
        // console.log('videoOptions', videoOptions)
        
        // player
        const self = this
        this.player = videojs(this.$refs.video, videoOptions, function() {

          // events
          const events = DEFAULT_EVENTS.concat(self.events).concat(self.globalEvents)

          // watch events
          const onEdEvents = {}
          for (let i = 0; i < events.length; i++) {
            if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
              (event => {
                onEdEvents[event] = null
                this.on(event, () => {
                  emitPlayerState(event, true)
                })
              })(events[i])
            }
          }

          // watch timeupdate
          this.on('timeupdate', function() {
            emitPlayerState('timeupdate', this.currentTime())
          })

          // player readied
          self.$emit('ready', this)
        })
      },
      dispose(callback) {
        if (this.player && this.player.dispose) {
          if (this.player.techName_ !== 'Flash') {
            this.player.pause && this.player.pause()
          }
          this.player.dispose()
          this.player = null
          this.$nextTick(() => {
            this.reseted = false
            this.$nextTick(() => {
              this.reseted = true
              this.$nextTick(() => {
                callback && callback()
              })
            })
          })
          /*
          if (!this.$el.children.length) {
            const video = document.createElement('video')
            video.className = 'video-js'
            this.$el.appendChild(video)
          }
          */
        }
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options, oldOptions) {
          this.dispose(() => {
            if (options && options.sources && options.sources.length) {
              this.initialize()
            }
          })
        }
      }
    }
  }
</script>
