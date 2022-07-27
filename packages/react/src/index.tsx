import React, { useState, useRef, useEffect } from 'react'
import {
  createPlayer,
  PlayerResult,
  props as _props,
  PropKey,
  Props,
  events,
  CamelCaseEventKey,
  createPlayerState,
  PlayerState,
  VideoJsPlayer
} from '../../../player'

export type { PlayerState as VideoPlayerState } from '../../../player'

type EventProps = Partial<Record<CamelCaseEventKey, (event: Event) => void>>
type ChildRenderPayload = {
  video: HTMLVideoElement
  player: VideoJsPlayer
  state: PlayerState
}

export interface VideoPlayerProps extends EventProps, Omit<Props, 'children'> {
  className?: string
  videoJsChildren?: Props['children']
  onStateChange?: (state: PlayerState) => void
  onMounted?: (payload: ChildRenderPayload) => void
  children?: (payload: ChildRenderPayload) => React.ReactNode
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ children, ...restProps }) => {
  const props = {
    ...restProps,
    children: restProps.videoJsChildren
  }

  const [mounted, setMounted] = useState(false)
  const videoElement = useRef<HTMLVideoElement | null>(null)
  const playerResult = useRef<PlayerResult | null>(null)
  const [playerState, setPlayerState] = useState<PlayerState | null>(null)

  // sync fallback options to Video.js config
  useEffect(() => {
    if (mounted) {
      playerResult.current?.updateOptions(props.options ?? {})
    }
  }, [props.options])

  // sync component props to Video.js config
  Object.keys(_props)
    .filter((key) => key !== 'options')
    .forEach((key) => {
      const k = key as PropKey
      useEffect(() => {
        if (mounted) {
          playerResult.current?.updatePropOption(k, props[k])
        }
      }, [props[k]])
    })

  useEffect(() => {
    if (videoElement.current) {
      // create player
      playerResult.current = createPlayer({
        props,
        element: videoElement.current,
        onEvent: (eventKey, event) => {
          props[events[eventKey]]?.(event)
        }
      })

      // create player state
      let tempState: PlayerState | null = null
      createPlayerState(playerResult.current!.player, {
        onInit(initState) {
          tempState = initState
          setPlayerState(initState)
        },
        onUpdate(_, __, newState) {
          setPlayerState(newState)
          props.onStateChange?.(newState)
        }
      })

      setMounted(true)
      props.onMounted?.({
        video: videoElement.current!,
        player: playerResult.current!.player,
        state: tempState!
      })
    }

    return () => {
      if (playerResult.current) {
        playerResult.current.dispose()
        playerResult.current = null
        setPlayerState(null)
      }
    }
  }, [])

  return (
    <div className={['react-video-player', props.className].filter(Boolean).join(' ')}>
      <video className="video-js" ref={videoElement} />
      {mounted &&
        children?.({
          video: videoElement.current!,
          player: playerResult.current!.player,
          state: playerState!
        })}
    </div>
  )
}
