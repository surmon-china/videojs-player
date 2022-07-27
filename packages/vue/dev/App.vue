<script setup lang="ts">
  import { reactive, shallowRef, toRaw } from 'vue'
  import Table from './Table.vue'
  import { VideoPlayer, VideoPlayerProps, VideoPlayerState } from '../src'
  import { VideoJsPlayer } from 'video.js'
  import 'video.js/dist/video-js.css'

  const languagesOptions = ['en', 'zh']
  const autoplayOptions = [false, 'muted', 'play'] as const
  const playbackRatesOptions = [
    [1, 2, 3],
    [0.5, 1.5, 3]
  ]
  const sources = [
    { src: 'http://vjs.zencdn.net/v/oceans.mp4', poster: '//vjs.zencdn.net/v/oceans.png' },
    {
      src: '//d2zihajmogu5jn.cloudfront.net/sintel/sintel.mp4',
      poster: '//d2zihajmogu5jn.cloudfront.net/sintel/poster.png'
    },
    {
      src: null,
      poster: null
    },
    {
      src: '//testxxx.net/abc.mp4',
      poster: '//cloudfront.net/abc/test.png'
    }
  ]

  const player = shallowRef<VideoJsPlayer>()
  const state = shallowRef<VideoPlayerState>()
  const config: VideoPlayerProps = reactive({
    src: sources[0].src!,
    poster: sources[0].poster!,
    autoplay: autoplayOptions[0],
    width: 800,
    height: 400,
    volume: 0.8,
    playbackRate: 2,
    playbackRates: playbackRatesOptions[0],
    controls: true,
    fluid: false,
    muted: false,
    loop: false,
    crossOrigin: 'anonymous',
    language: languagesOptions[0],
    languages: {
      zh: {}
    }
  })

  const handleSelectSource = (index: number) => {
    config.src = sources[index].src!
    config.poster = sources[index].poster!
  }

  const handleMounted = (payload: any) => {
    console.log('----handleMounted', payload)
    state.value = payload.state
    player.value = payload.player
  }

  const handlePlayerReady = (event: any) => {
    console.log('---handlePlayerReady', event)
  }

  const timeRangesToString = (timeRanges?: TimeRanges) => {
    if (!timeRanges) {
      return ''
    }
    const array = []
    for (let i = 0; i < timeRanges.length; i++) {
      const start = timeRanges.start(i).toFixed(2)
      const end = timeRanges.end(i).toFixed(2)
      array.push(`[${start}, ${end}]`)
    }
    return array.join(', ')
  }
</script>

<template>
  <div class="example">
    <div class="left">
      <div class="top">
        <table class="tools">
          <tr>
            <td>source:</td>
            <td>
              <select
                :value="config.src"
                @change="(event) => handleSelectSource(event.target.selectedIndex)"
              >
                <option :key="source.src" :value="source.src" v-for="(source, index) in sources">
                  {{ index + 1 }}
                </option>
              </select>
            </td>
            <td>{{ config.src }}</td>
          </tr>
          <tr>
            <td>autoplay:</td>
            <td>
              <select v-model="config.autoplay">
                <option :key="index" :value="option" v-for="(option, index) in autoplayOptions">
                  {{ option }}
                </option>
              </select>
            </td>
            <td>{{ config.autoplay }}</td>
          </tr>
          <tr>
            <td>playbackRatesOptions:</td>
            <td>
              <select v-model="config.playbackRates">
                <option
                  :key="index"
                  :value="option"
                  v-for="(option, index) in playbackRatesOptions"
                >
                  {{ option }}
                </option>
              </select>
            </td>
            <td>{{ config.playbackRates }}</td>
          </tr>
          <tr>
            <td>language:</td>
            <td>
              <select v-model="config.language">
                <option
                  :key="index"
                  :value="language"
                  v-for="(language, index) in languagesOptions"
                >
                  {{ language }}
                </option>
              </select>
            </td>
            <td>{{ config.language }}</td>
          </tr>
          <tr>
            <td>width:</td>
            <td><input type="range" min="500" max="800" v-model.number="config.width" /></td>
            <td>{{ config.width }}</td>
          </tr>
          <tr>
            <td>height:</td>
            <td><input type="range" min="200" max="500" v-model.number="config.height" /></td>
            <td>{{ config.height }}</td>
          </tr>
          <tr>
            <td>volume:</td>
            <td>
              <input type="range" min="0" max="1" step="0.1" v-model.number="config.volume" />
            </td>
            <td>{{ config.volume }}</td>
          </tr>
          <tr>
            <td>Playback Rate:</td>
            <td>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.25"
                v-model.number="config.playbackRate"
              />
            </td>
            <td>{{ config.playbackRate }}</td>
          </tr>
          <tr>
            <td>controls:</td>
            <td><input type="checkbox" v-model="config.controls" /></td>
            <td>{{ config.controls }}</td>
          </tr>
          <tr>
            <td>fluid:</td>
            <td><input type="checkbox" v-model="config.fluid" /></td>
            <td>{{ config.fluid }}</td>
          </tr>
          <tr>
            <td>mute:</td>
            <td><input type="checkbox" v-model="config.muted" /></td>
            <td>{{ config.muted }}</td>
          </tr>
          <tr>
            <td>loop:</td>
            <td><input type="checkbox" v-model="config.loop" /></td>
            <td>{{ config.loop }}</td>
          </tr>
        </table>
        <div class="props">
          <Table :data="config" />
        </div>
      </div>
      <video-player
        class="item player"
        :src="config.src"
        :autoplay="config.autoplay"
        :poster="config.poster"
        v-model:width="config.width"
        v-model:height="config.height"
        v-model:volume="config.volume"
        v-model:playbackRate="config.playbackRate"
        v-model:controls="config.controls"
        v-model:muted="config.muted"
        :playbackRates="config.playbackRates"
        :fluid="config.fluid"
        :loop="config.loop"
        :crossOrigin="config.crossOrigin"
        :language="config.language"
        :languages="config.languages"
        @ready="handlePlayerReady"
        @mounted="handleMounted"
      >
        <template v-slot="{ player, state, video }">
          <div class="player-box">
            <span>video.volume: {{ video.volume }}</span>
            <button class="item" @click="state.playing ? player.pause() : player.play()">
              {{ state.playing ? 'Pause' : 'Play' }}
            </button>
            <button class="item" @click="player.muted(!state.muted)">
              {{ state.muted ? 'unmuted' : 'mute' }}
            </button>
            <button class="item" @click="player.requestFullscreen()">
              enter fullscreen {{ state.fullscreen }}
            </button>
            <p>
              0
              <meter :min="0" :max="state?.duration ?? 0" :value="state.currentTime" />
              -{{ state.duration - state.currentTime }}
            </p>
            <p>
              volume:{{ config.volume }}
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                :value="state.volume"
                @change="($event) => player.volume(Number($event.target.value))"
              />
            </p>
          </div>
        </template>
      </video-player>
    </div>
    <div class="right">
      <Table :data="state" />
      <hr />
      <p>buffered: {{ timeRangesToString(state?.buffered) }}</p>
      <p>played: {{ timeRangesToString(state?.played) }}</p>
      <p>seekable: {{ timeRangesToString(state?.seekable) }}</p>
    </div>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  .example {
    height: 100vh;
    display: flex;
    justify-content: center;

    .player {
      .player-box {
        margin-top: 2rem;

        .item {
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
      }
    }

    .left {
      width: 60%;
      .top {
        display: flex;
        margin-bottom: 2rem;

        .tools,
        .props {
          width: 50%;
        }
      }
    }

    .right {
      width: 40%;
    }
  }
</style>
