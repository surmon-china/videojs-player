
window.videojs = require('video.js')
videojs = videojs.default || videojs

var videoPlayer = {
  videojs: videojs,
  install: function(Vue) {
    Vue.directive('video-player', {
      bind: function(el, binding, vnode) {
        if (!el.children.length) {
          var video = document.createElement('video')
          video.className = 'video-js'
          el.appendChild(video)
        }
      },
      inserted: function (el, binding, vnode) {

        var _this = vnode.context
        var attrs = vnode.data.attrs || {}
        var customInstanceName = attrs.playerInstanceName || binding.arg
        var instanceName = customInstanceName || 'player'
        var options = binding.value || {}
        var player = _this[instanceName]
        var playsinline = attrs.playsinline || false
        var customEventName = attrs.customEventName || 'statechanged'

        // playsinline
        if (playsinline) {
          el.children[0].setAttribute('playsinline', playsinline)
          el.children[0].setAttribute('webkit-playsinline', playsinline)
        }

        // initialize
        if (!player) {

          var optionsKey
          var defaultOptions = {
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
            techOrder: ['html5'],
            playbackRates: []
          }

          // assign options
          for (optionsKey in defaultOptions) {
            if (options[optionsKey] === undefined && defaultOptions[optionsKey] != undefined) {
              options[optionsKey] = defaultOptions[optionsKey]
            }
          }

          if (options.plugins) {
            delete options.plugins.__ob__
          }
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
              eventEmit(vnode, customEventName, values)
            }
          }
          
          // instance
          player = _this[instanceName] = videojs(el.children[0], options, function() {

            // player ready
            var self = this
            emitPlayerState('ready')

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
                self.on(event, function() {
                  emitPlayerState(event, true)
                })
              })(events[i])
            }

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
            video.className = 'video-js'
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
