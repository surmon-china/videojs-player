import type { PropsConfig, PropKey, EventKey, VideoJsPlayer } from '../../../player'
import { propsConfig, propKeys, events } from '../../../player'

const twoWayPropKeys = propKeys.filter((key) => Boolean(propsConfig[key].onEvent))
const getPropUpdateEventName = (key: PropKey) => `update:${key}`

// Convert all supported Video.js configuration changes to two-way binding events.
export const bindPropUpdateEvent = (options: {
  player: VideoJsPlayer
  onEvent: (key: EventKey, value: any) => void
}) => {
  twoWayPropKeys.forEach((key) => {
    propsConfig[key]?.onEvent?.(options.player, (newValue: unknown) => {
      options.onEvent(getPropUpdateEventName(key) as EventKey, newValue)
    })
  })
}

// Add two-way binding events to all props that have onEvent.
// The event type information is missing here, but it is necessary.
export const normalizedEvents = [
  ...events,
  ...twoWayPropKeys.map(getPropUpdateEventName)
] as typeof events

// Set the default value of all Boolean type's props to undefined.
// https://vuejs.org/guide/components/props.html#boolean-casting
export const normalizedProps = propKeys.reduce((result, key) => {
  const prop = propsConfig[key]
  const types = Array.isArray(prop.type) ? prop.type : [prop.type]
  const newProp = { ...prop }
  if (types.includes(Boolean)) {
    newProp.default = void 0
  }

  return { ...result, [key]: newProp }
}, {} as PropsConfig)
