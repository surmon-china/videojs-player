import React, { useState, useRef, useEffect } from 'react'
import { propKeys, Props, eventsMap, camelCaseEvents, CamelCaseEventKey } from '../../../player'
import { createPlayer, createPlayerState, PlayerResult, PlayerState } from '../../../player'
import { VideoJsPlayer } from '../../../player'

export type { PlayerState as VideoPlayerState } from '../../../player'
export type { CamelCaseEventKey as VideoPlayerEvents } from '../../../player'

type EventProps = Partial<Record<CamelCaseEventKey, (event: Event) => void>>
type ChildRenderPayload = {
  video: HTMLVideoElement
  player: VideoJsPlayer
  state: PlayerState
}

export interface VideoPlayerProps extends EventProps, Omit<Props, 'children'> {
  className?: string
  videoJsChildren?: Props['children']
  onStateChange?(state: PlayerState): void
  onMounted?(payload: ChildRenderPayload): void
  onUnmounted?(): void
  children?(payload: ChildRenderPayload): React.ReactNode
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  className,
  videoJsChildren,
  onStateChange,
  onMounted,
  onUnmounted,
  children,
  ...restProps
}) => {
  const props: Props = { children: videoJsChildren }
  const events: Record<CamelCaseEventKey, (event: Event) => void> = {} as any
  const restPropKeys = Object.keys(restProps) as Array<keyof typeof restProps>
  restPropKeys.forEach((key) => {
    // @ts-ignore
    if (propKeys.includes(key)) props[key] = restProps[key]
    // @ts-ignore
    if (camelCaseEvents.includes(key)) events[key] = restProps[key]
  })

  const [mounted, setMounted] = useState(false)
  const [playerState, setPlayerState] = useState<PlayerState | null>(null)
  const videoElement = useRef<HTMLVideoElement | null>(null)
  const playerResult = useRef<PlayerResult | null>(null)

  // Sync React class name to Video.js container.
  const [initClassName] = useState(className)
  const oldClassName = useRef<string>()
  useEffect(() => {
    if (mounted) {
      playerResult.current?.updateClassNames(oldClassName.current, className)
      oldClassName.current = className
    }
  }, [mounted, className])

  // Sync fallback options to Video.js config.
  useEffect(() => {
    if (mounted) {
      playerResult.current?.updateOptions(props.options ?? {})
    }
  }, [props.options])

  // Sync component props to Video.js config.
  propKeys
    .filter((key) => key !== 'options')
    .forEach((key) => {
      useEffect(() => {
        if (mounted) {
          playerResult.current?.updatePropOption(key, props[key])
        }
      }, [props[key]])
    })

  useEffect(() => {
    if (videoElement.current) {
      // Create player.
      playerResult.current = createPlayer({
        props,
        element: videoElement.current,
        className: initClassName,
        onEvent: (eventKey, event) => {
          events[eventsMap[eventKey]]?.(event)
        }
      })

      // Create player state.
      let tempState: PlayerState | null = null
      createPlayerState(playerResult.current!.player, {
        onInit(initState) {
          tempState = initState
          setPlayerState(initState)
        },
        onUpdate(_, __, newState) {
          setPlayerState(newState)
          onStateChange?.(newState)
        }
      })

      // Emit mounted event.
      setMounted(true)
      onMounted?.({
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
        onUnmounted?.()
      }
    }
  }, [])

  return (
    <div data-vjs-player className={initClassName}>
      <video className="video-js r-video-player" ref={videoElement} />
      {mounted &&
        children?.({
          video: videoElement.current!,
          player: playerResult.current!.player,
          state: playerState!
        })}
    </div>
  )
}
