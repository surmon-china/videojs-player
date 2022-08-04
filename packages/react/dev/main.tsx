import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { VideoPlayer, VideoPlayerProps, VideoPlayerState } from '../src'
import { VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.css'

export const App: React.FC = () => {
  const [enabledPlayer, setEnabledPlayer] = useState(true)

  const playerRef = useRef<VideoJsPlayer>()
  const [state, setState] = useState<VideoPlayerState>()
  const [config, setConfig] = useState<VideoPlayerProps>(() => ({
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    poster: 'http://vjs.zencdn.net/v/oceans.png',
    volume: 0.2
  }))

  const updateConfig = <K extends keyof VideoPlayerState>(key: K, value: VideoPlayerState[K]) => {
    setConfig({ ...config, [key]: value })
  }

  const handlePlayerMounted: VideoPlayerProps['onMounted'] = (payload) => {
    console.log('---handlePlayerMounted', payload)
    playerRef.current = payload.player
    setState(payload.state)
  }

  const handlePlayerUnmounted = () => {
    console.log('---handlePlayerUnmounted')
  }

  const handlePlayerReady = (event: Event) => {
    console.log('---handlePlayerReady', event)
  }

  const handlePlayerDispose = (event: Event) => {
    console.log('---handlePlayerDispose', event)
  }

  const handleVolumeChange = (event: Event) => {
    updateConfig('volume', Number(playerRef.current!.volume().toFixed(1)))
  }

  return (
    <div>
      <div className="config-controls">
        volume: {config.volume}
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={config.volume}
          onChange={(event) => updateConfig('volume', Number(event.target.value))}
        />
      </div>
      <br />
      <button onClick={() => setEnabledPlayer(!enabledPlayer)}>toggle player</button>
      <br />
      <br />
      <div className="player-wrapper">
        {enabledPlayer && (
          <VideoPlayer
            className={`videojs-player vjs-big-play-centered player-${
              state?.playing ? 'playing' : 'not'
            }`}
            src={config.src}
            poster={config.poster}
            volume={config.volume}
            width={600}
            height={400}
            fluid={false}
            controls
            onStateChange={setState}
            onMounted={handlePlayerMounted}
            onUnmounted={handlePlayerUnmounted}
            onReady={handlePlayerReady}
            onDispose={handlePlayerDispose}
            onVolumeChange={handleVolumeChange}
          >
            {({ player, state }) => {
              return (
                <div
                  className="advanced-controls"
                  style={{
                    fontSize: 30,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    display: 'block'
                  }}
                >
                  <button
                    onClick={() => {
                      state.playing ? player.pause() : player.play()
                    }}
                  >
                    {state.playing ? 'pause' : 'play'}
                  </button>
                  <button onClick={() => player.muted(!state.muted)}>
                    {state.muted ? 'unmuted' : 'mute'}
                  </button>
                  <button
                    onClick={() => {
                      state.isFullscreen ? player.exitFullscreen() : player.requestFullscreen()
                    }}
                  >
                    {state.isFullscreen ? '🖥 Exit' : '💻 Enter'} FS
                  </button>
                  <button
                    onClick={() => {
                      state.isInPictureInPicture
                        ? player.exitPictureInPicture()
                        : player.requestPictureInPicture()
                    }}
                  >
                    📺 {state.isInPictureInPicture ? 'Exit' : 'Enter'} PIP
                  </button>
                </div>
              )
            }}
          </VideoPlayer>
        )}
      </div>
      <hr />
      <div className="player-state">
        <code
          style={{
            maxWidth: '100%',
            overflowWrap: 'anywhere'
          }}
        >
          {JSON.stringify(state ?? {})}
        </code>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
