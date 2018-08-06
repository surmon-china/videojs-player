'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = exports.videoPlayer = exports.videojs = undefined;

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_EVENTS = ['loadeddata', 'canplay', 'canplaythrough', 'play', 'pause', 'waiting', 'playing', 'ended', 'error'];

var videoPlayerDirective = function videoPlayerDirective(globalOptions) {
  globalOptions.events = globalOptions.events || [];
  globalOptions.options = globalOptions.options || {};

  var getInstanceName = function getInstanceName(el, binding, vnode) {
    var instanceName = null;
    if (binding.arg) {
      instanceName = binding.arg;
    } else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])) {
      instanceName = vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'];
    } else if (el.id) {
      instanceName = el.id;
    }
    return instanceName || 'player';
  };

  var repairDom = function repairDom(el) {
    if (!el.children.length) {
      var video = document.createElement('video');
      video.className = 'video-js';
      el.appendChild(video);
    }
  };

  var initPlayer = function initPlayer(el, binding, vnode) {

    var self = vnode.context;
    var attrs = vnode.data.attrs || {};
    var options = binding.value || {};
    var instanceName = getInstanceName(el, binding, vnode);
    var customEventName = attrs.customEventName || 'statechanged';
    var player = self[instanceName];

    var componentEvents = attrs.events || [];
    var playsinline = attrs.playsinline || false;

    if (playsinline) {
      el.children[0].setAttribute('playsinline', playsinline);
      el.children[0].setAttribute('webkit-playsinline', playsinline);
      el.children[0].setAttribute('x5-playsinline', playsinline);
      el.children[0].setAttribute('x5-video-player-type', 'h5');
      el.children[0].setAttribute('x5-video-player-fullscreen', false);
    }

    if (attrs.crossOrigin) {
      el.children[0].crossOrigin = attrs.crossOrigin;
      el.children[0].setAttribute('crossOrigin', attrs.crossOrigin);
    }

    if (!player) {
      var videoOptions = (0, _objectAssign2.default)({}, {
        controls: true,
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
      }, globalOptions.options, options);

      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__;
      }

      var eventEmit = function eventEmit(vnode, name, data) {
        var handlers = vnode.data && vnode.data.on || vnode.componentOptions && vnode.componentOptions.listeners;
        if (handlers && handlers[name]) handlers[name].fns(data);
      };

      var emitPlayerState = function emitPlayerState(event, value) {
        if (event) {
          eventEmit(vnode, event, player);
        }
        if (value) {
          eventEmit(vnode, customEventName, _defineProperty({}, event, value));
        }
      };

      player = self[instanceName] = (0, _video2.default)(el.children[0], videoOptions, function () {
        var _this = this;

        var events = DEFAULT_EVENTS.concat(componentEvents).concat(globalOptions.events);

        var onEdEvents = {};
        for (var i = 0; i < events.length; i++) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
            (function (event) {
              onEdEvents[event] = null;
              _this.on(event, function () {
                emitPlayerState(event, true);
              });
            })(events[i]);
          }
        }

        this.on('timeupdate', function () {
          emitPlayerState('timeupdate', this.currentTime());
        });

        emitPlayerState('ready');
      });
    }
  };

  var disposePlayer = function disposePlayer(el, binding, vnode) {
    var self = vnode.context;
    var instanceName = getInstanceName(el, binding, vnode);
    var player = self[instanceName];
    if (player && player.dispose) {
      if (player.techName_ !== 'Flash') {
        player.pause && player.pause();
      }
      player.dispose();
      repairDom(el);
      self[instanceName] = null;
      delete self[instanceName];
    }
  };

  return {
    inserted: initPlayer,

    bind: function bind(el, binding, vnode) {
      repairDom(el);
    },
    update: function update(el, binding, vnode) {
      var options = binding.value || {};
      disposePlayer(el, binding, vnode);
      if (options && options.sources && options.sources.length) {
        initPlayer(el, binding, vnode);
      }
    },

    unbind: disposePlayer
  };
};

var videoPlayer = videoPlayerDirective({});

var install = function install(Vue) {
  var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    options: {},
    events: []
  };

  Vue.directive('video-player', videoPlayerDirective(globalOptions));
};

var VueVideoPlayer = { videojs: _video2.default, videoPlayer: videoPlayer, install: install };

exports.default = VueVideoPlayer;
exports.videojs = _video2.default;
exports.videoPlayer = videoPlayer;
exports.install = install;
