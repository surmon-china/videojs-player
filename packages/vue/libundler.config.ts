import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'VueVideoPlayer',
  outFileName: 'videojs-player',
  banner: false,
  entry: './src/index.ts',
  outDir: './dist',
  targets: ['esm', 'cjs', 'umd'],
  external: ['vue', 'video.js', '@types/video.js'],
  globals: {
    vue: 'Vue',
    'video.js': 'videojs'
  },
  exports: 'named',
  ts: {}
})
