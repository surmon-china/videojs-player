<template>
  <div class="video-player">
    <video class="video-js vjs-custom-skin" :class="{ 'live': options.live }"></video>
  </div>
</template>

<script>
  var languages = require('./languages.js')
  export default {
    name: 'video-player',
    data: function () {
      return {
        customEventName: 'player-state-changed'
      }
    },
    props: {
      configs: {
        type: Object,
        default: function () {
          return {
            youtube: false,
            switcher: true,
            hls: true
          }
        }
      },
      options: {
        type: Object,
        required: true
      },
    },
    ready: function() {
      if (this.options) { this.initialize() }
    },
    mounted: function() {
      if (this.options) { this.initialize() }
    },
    beforeDestroy: function() {
      this.dispose()
    },
    methods: {

      // 构建播放器
      initialize: function() {

        // console.log('init build player')

        var configs = this.configs
        if (configs.hls) require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
        if (configs.youtube) require('videojs-youtube')
        if (configs.switcher) require('videojs-resolution-switcher')

        // init
        var options = this.options
        // start_time
        options.start = options.start || 0
        // is_live?
        options.live  = options.live || false
        // player_src
        options.source  = options.source || false
        // playbackRates [0.7, 1.0, 1.5, 2.0]
        options.playbackRates = options.playbackRates || false
        // player defaultSrcReId
        options.defaultSrcReId = options.defaultSrcReId || 1
        // default muted
        options.muted = options.muted || false
        // playsinline
        options.playsinline = options.playsinline !== undefined ? options.playsinline : true;

        // 自定义事件名称
        var customEventName = options.customEventName || this.customEventName

        if (typeof options.source !== 'object') {
          this.dispose()
          return console.error('video resource must be a object or array')
        } else {
          if (options.source instanceof Array) {
            for (var i = 0, length = options.source.length; i < length; i++) {
              var item = options.source[i];
              if (!item.src) {
                this.dispose()
                return console.error('video resource is illegitimate')
              }
            }
          } else {
            if (!options.source.src) {
              this.dispose()
              return console.error('video resource is illegitimate')
            }
          }
        }

        // controlBar config 控制条的dom结构控制
        var controlBar = {
          remainingTimeDisplay: false,
          playToggle: {},
          progressControl: {},
          fullscreenToggle: {},
          volumeMenuButton: {
            inline: false,
            vertical: true
          }
        }

        // 直播
        if (options.live) {
          controlBar.timeDivider = false
          controlBar.durationDisplay = false
          controlBar.currentTimeDisplay = false
        }

        // build player config
        var video_options = {
          'controls': options.controls !== undefined ? options.controls : true,
          'autoplay': options.autoplay !== undefined ? options.autoplay : true,
          'preload': options.preload || 'auto',
          'poster': options.poster ||  '',
          'wdith': options.wdith || '100%',
          'height': options.height || 360,
          'fluid': options.fluid || false,
          'controlBar': options.controlBar || controlBar,
          'language': options.language || 'en',
          'techOrder': options.techOrder || ['html5', 'flash'],
          'flash': { hls: { withCredentials: false }},
          'html5': { hls: { withCredentials: false }},
          'youtube': { "ytControls": options.ytControls ? Number(options.ytControls) : 0 }
        }

        // 添加指定语言
        var language = video_options.language
        videojs.addLanguage(language, languages[language])

        // 是否应用IOS下的禁止自动全屏
        var playsinline = options.playsinline
        playsinline && this.$el.children[0].setAttribute('webkit-playsinline', playsinline)

        // 是否适用youtube
        // if (video_options.techOrder.indexOf('youtube') > -1) require('videojs-youtube')

        // 非直播情况
        if (!options.live) {

          // 单独播放资源
          if (!!options.source.src) {
            video_options.sources = [options.source]

          // 多播放源切换
          } else {
            video_options.plugins = { videoJsResolutionSwitcher: { default: options.defaultSrcReId, dynamicLabel: true }}
          }

          // 是否使用播放速度控制
          var playbackRates = options.playbackRates
          if (!!playbackRates && !!playbackRates.length) video_options.playbackRates = playbackRates
        }

        // 实例化播放器
        var _this = this
        this.player = null
        this.player = videojs(this.$el.children[0], video_options, function() {

          // 是否应用多版本切换清晰度
          if (!options.live) {
            if (!!options.source.length) {
              this.updateSrc(options.source)
              this.on('resolutionchange', function(){
                _this.$emit && _this.$emit(customEventName, { resolutionchange: this.src() })
                _this.$dispatch && _this.$dispatch(customEventName, { resolutionchange: this.src() })
              })
            }
          }

          if (options.live) {

            // console.log('live video', this, options.source)
            this.src(options.source)

            // var hls = this.tech({ IWillNotUseThisInPlugins: true }).hls
            // 直播每次的切片请求
            /*
            this.tech_.hls.xhr.beforeRequest = function(options) {
              console.log(options)
              return options
            }
            */
          }

          // 监听播放
          this.on('play', function() {
            _this.$emit && _this.$emit(customEventName, { play: true })
            _this.$dispatch && _this.$dispatch(customEventName, { play: true })
          })

          // 监听暂停
          this.on('pause', function() {
            _this.$emit && _this.$emit(customEventName, { pause: true })
            _this.$dispatch && _this.$dispatch(customEventName, { pause: true })
          })

          // 监听结束
          this.on('ended', function() {
            _this.$emit && _this.$emit(customEventName, { ended: true })
            _this.$dispatch && _this.$dispatch(customEventName, { ended: true })
          })

          // 元文件信息
          this.on('loadeddata', function() {
            if (!options.live && !!options.start) this.currentTime(options.start)
            this.muted(_this.options.muted)
            _this.$emit && _this.$emit(customEventName, { loadeddata: true })
            _this.$dispatch && _this.$dispatch(customEventName, { loadeddata: true })
          })

          // 监听时间
          this.on('timeupdate', function() {
            _this.$emit && _this.$emit(customEventName, { currentTime: this.currentTime() })
            _this.$dispatch && _this.$dispatch(customEventName, { currentTime: this.currentTime() })
          })
        })
      },
      // 释放播放器
      dispose: function() {
        if (!!this.player && !!videojs) {
          // this.player.dispose()
          this.player.pause && this.player.pause()
          videojs(this.$el).dispose()
          delete this.player
        }
      }
    },
    watch: {
      // 观察选项的动态变化，选项变化了就重新初始化播放器
      options: {
        handler: function (newVal, oldVal) {
          var options = newVal
          if (typeof options.source !== 'object') {
            this.dispose()
            return console.error('video resource must be a object or array')
          } else {
            if (options.source instanceof Array) {
              for (var i = 0, length = options.source.length; i < length; i++) {
                var item = options.source[i]
                if (!item.src) {
                  this.dispose()
                  return console.error('video resource is illegitimate')
                }
              }
            } else {
              if (!options.source.src) {
                this.dispose()
                return console.error('video resource is illegitimate')
              }
            }
          }
          if (this.player) this.player.src(this.options.source)
          if (!this.player) this.initialize()
        },
        deep: true
      }
    }
  }
</script>

<style src="./player.css"></style>
