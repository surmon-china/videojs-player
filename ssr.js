
const videojs = window.videojs = require('video.js')

var videoPlayer = {
  install: function(Vue) {
    Vue.directive('video-player', {
      bind: function(el, binding, vnode) {
        if (!el.children.length) {
          var video = document.createElement('video')
          video.className = 'video-js vjs-custom-skin'
          el.appendChild(video)
        }
      },
      inserted: function (el, binding, vnode) {

        var _this = vnode.context
        var customInstanceName = vnode.data.attrs ? vnode.data.attrs.playerInstanceName : binding.arg
        var instanceName = customInstanceName || 'player'
        var options = binding.value || {}
        var player = _this[instanceName]

        // initialize
        if (!player) {

          var optionsKey
          var defaultOptions = {

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
            width: '1100',
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
            playbackRates: []
          }

          // assign options
          for (optionsKey in defaultOptions) {
            if (options[optionsKey] === undefined && defaultOptions[optionsKey] != undefined) {
              options[optionsKey] = defaultOptions[optionsKey]
            }
          }

          delete options.plugins.__ob__
          // console.log(options)

          var eventEmit = function (vnode, name, data) {
            var handlers = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners)
            if (handlers && handlers[name]) {
              handlers[name].fns(data)
            }
          }

          // emit event
          var emitPlayerState = function (event, value) {
            if (event) {
              eventEmit(vnode, event, player)
            }
            if (value) {
              var values = {}
              values[event] = value
              eventEmit(vnode, options.customEventName, values)
            }
          }
          
          // instance
          player = _this[instanceName] = videojs(el.children[0], options, function() {

            // player ready
            emitPlayerState('ready')

            this.on('loadeddata', function() {
              this.muted(options.muted)
              if (!!options.start) {
                this.currentTime(options.start)
              }
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
        }
      },
      unbind: function (el, binding, vnode) {
        var _this = vnode.context
        var customInstanceName = vnode.data.attrs ? vnode.data.attrs.playerInstanceName : binding.arg
        var instanceName = customInstanceName || 'player'
        var player = _this[instanceName]
        if (player && videojs) {
          player.pause && player.pause()
          videojs(el.children[0]).dispose()
          if (!el.children.length) {
            var video = document.createElement('video')
            video.className = 'video-js vjs-custom-skin'
            el.appendChild(video)
          }
          _this[instanceName] = null
          delete _this[instanceName]
        }
      }
    })
  }
}

module.exports = videoPlayer
