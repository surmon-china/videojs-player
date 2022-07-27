import { eventKeys, props, PropKey, VideoJsPlayer } from '../../../player'

const propKeys = Object.keys(props) as Array<PropKey>
const twoWayPropKeys = propKeys.filter((key) => Boolean(props[key].onEvent))
const getPropUpdateEventName = (key: PropKey) => `update:${key}`

// Convert all supported Video.js configuration changes to two-way binding events.
export const bindPropUpdateEvent = (options: {
  player: VideoJsPlayer
  onEvent: (key: any, value: any) => void
}) => {
  twoWayPropKeys.forEach((key) => {
    props[key]?.onEvent?.(options.player, (newValue: unknown) => {
      options.onEvent(getPropUpdateEventName(key) as any, newValue)
    })
  })
}

// Add two-way binding events to all props that have onEvent.
// The event type information is missing here, but it is necessary.
export const normalizeEvents = <T extends typeof eventKeys>(_events: T): T => {
  const updatePropKeys = twoWayPropKeys.map(getPropUpdateEventName)
  return [..._events, ...updatePropKeys] as unknown as T
}

// Set the default value of all Boolean type's props to undefined.
// https://vuejs.org/guide/components/props.html#boolean-casting
export const normalizeProps = <T extends typeof props>(_props: T): T => {
  return Object.keys(_props).reduce((result, key) => {
    const k = key as keyof typeof props
    const prop = _props[k]
    const types = Array.isArray(prop.type) ? prop.type : [prop.type]
    const newProp = { ...prop }
    if (types.includes(Boolean)) {
      newProp.default = void 0
    }
    return { ...result, [k]: newProp }
  }, {} as any)
}
