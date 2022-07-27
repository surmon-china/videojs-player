import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VueVideoPlayer, { VideoPlayer, install } from '../src/index'

// https://test-utils.vuejs.org/api
test('export type', async () => {
  expect(VideoPlayer).toBeDefined()
  expect(install).toBeTypeOf('function')
  expect(VueVideoPlayer).toBeDefined()
  expect(VueVideoPlayer.install).toBeTypeOf('function')
  expect(VueVideoPlayer.VideoPlayer).toBeDefined()
  expect(VueVideoPlayer.VideoPlayer).toEqual(VideoPlayer)
  expect(VueVideoPlayer.install).toEqual(install)
})

test('mount component', async () => {
  const wrapper = mount(VideoPlayer, { props: { src: 'https://vjs.zencdn.net/v/oceans.mp4' } })
  expect(wrapper.emitted()).toHaveProperty('mounted')
  // TODO: test case
})
