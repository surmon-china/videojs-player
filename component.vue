<template>
  <div class="video-player">
    <video class="video-js vjs-default-skin" :class="{ 'live': options.live }"></video>
  </div>
</template>

<script>

  // load
  var videojs = require('video.js')
  var languages = require('./languages.js')
  var videojsContribHls = require('videojs-contrib-hls')
  var videojsResolutionSwitcher = require('videojs-resolution-switcher')
  require('video.js/dist/video-js.css')
  // require('video.js/dist/video-js.swf')
  
  // config
  videojs.options.flash.swf = "https://cdn.bootcss.com/video.js/5.13.0/video-js.swf"

  export default {
    name: 'video-player',
    props: {
      options: {
        type: Object,
        required: true
      },
    },
    ready: function() {
      if (this.options) {
        this.initialize()
      }
    },
    beforeDestory: function() {
      this.dispose()
    },
    methods: {

      // 构建播放器
      initialize: function() {

        // console.log('init build player')

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
        options.muted = options.muted || false

        // controlBar config 控制条的dom结构控制
        var controlBar = {
          remainingTimeDisplay: false,
          durationDisplay: {},
          currentTimeDisplay: {},
          volumeMenuButton: {
            inline: false,
            vertical: true
          }
        }

        // build player config
        var video_options = {
          'controls': options.controls || true, 
          'autoplay': options.autoplay !== undefined ? options.autoplay : true,
          'preload': options.preload || 'auto',
          'poster': options.poster ||  'images/qrcode.png',
          'wdith': options.wdith || '100%',
          'height': options.height || 380,
          'controlBar': options.controlBar || controlBar,
          'language': options.language || 'en',
          'techOrder': options.techOrder || ['html5', 'flash']
        }

        // 添加指定语言
        var language = video_options.language
        videojs.addLanguage(language, languages[language])

        // 非直播情况
        if (!options.live) {
          if (typeof options.source == 'object') {
            if (!!options.source.src) {
              // 单独播放资源
              video_options.sources = [options.source]
            } else {
              // 多清晰度版本播放资源
              video_options.plugins = { videoJsResolutionSwitcher: { default: options.defaultSrcReId, dynamicLabel: true }}
            }
          } else {
            throw new Error('video player src must be a object or array, 播放器src属性必须是数组或对象')
          }

          // 是否使用播放速度控制
          var playbackRates = options.playbackRates
          if (!!playbackRates && !!playbackRates.length) video_options.playbackRates = playbackRates
        }

        // 实例化播放器
        var _this = this
        this.player = null
        this.player = videojs(this.$el.children[0], video_options, function() {

          // console.log('Player loaded!')
          var is_live = !!options.live

          // 是否应用多版本切换清晰度
          if (!is_live) {
            if (typeof options.source == 'object' && !!options.source.length) {
              // console.log('resolutionchange')
              this.updateSrc(options.source)
              // { type: "video/mp4", src: 'http://7xnbft.com2.z0.glb.clouddn.com/sample_video_M.mp4', label: '高清', res: 2 }
              this.on('resolutionchange', function(){
                // console.info('分辨率切换至新地址：', _this, this.src())
                _this.$dispatch('player', { resolutionchange: this.src()})
              })
            }
          }

          // is_live
          if (is_live) {
            console.log('live video', options.source)
            if (typeof options.source == 'string') {
              this.src({ src: options.source, type: 'application/x-mpegURL', withCredentials: false })
              // var hls = this.tech({ IWillNotUseThisInPlugins: true }).hls
              // 直播每次的切片请求
              this.tech_.hls.xhr.beforeRequest = function(options) {
                // console.log(options)
                return options
              }
            } else {
              throw new Error('live type src must be a string url')
            }
          }

          // 监听播放
          this.on('play', function() { _this.$dispatch('player', { play: true }) })

          // 监听暂停
          this.on('pause', function() { _this.$dispatch('player', { pause: true }) })

          // 监听结束
          this.on('ended', function() { _this.$dispatch('player', { ended: true }) })

          // 元文件信息
          this.on('loadeddata', function() {
            if (!options.live && !!options.start) this.currentTime(options.start)
            _this.$dispatch('player', { loadeddata: true })
            this.muted(_this.options.muted)
          })

          // 监听时间
          this.on('timeupdate', function() { _this.$dispatch('player', { currentTime: this.currentTime() }) })
        })

        
      },
      // 释放播放器
      dispose: function() {
        if (!!this.player && !!this.player.dispose) {
          this.player.dispose()
          this.player = null
          delete this.player
        }
      }
    },
    events: {
      'player': function(action) {
        // console.log(action)
        if (action == 'play') this.player.play()
        if (action == 'pause') this.player.pause()
        if (action == 'refresh') {
          this.player.currentTime(0)
          this.player.play()
        }
      }
    }
  }
</script>

<style src="./player.css"></style>
