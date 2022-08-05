import React from 'react'
import TestRenderer from 'react-test-renderer'
import { test, expect } from 'vitest'
import { VideoPlayer } from '../src'

// https://test-utils.vuejs.org/api
test('export type', () => {
  expect(VideoPlayer).toBeDefined()
})

test('mount component', () => {
  let payload = null
  const testRenderer = TestRenderer.create(
    <VideoPlayer
      src="https://vjs.zencdn.net/v/oceans.mp4"
      onMounted={(_payload) => (payload = _payload)}
    />
  )

  const root = testRenderer.root
  const tree = testRenderer.toTree()
  const json = testRenderer.toJSON()
  expect(root.findByType(VideoPlayer).props.src).toBe('https://vjs.zencdn.net/v/oceans.mp4')
  // expect(tree!.rendered).toBe(1)
  // expect(json!.children!.length).toBe(1)
  // TODO: test case
})
