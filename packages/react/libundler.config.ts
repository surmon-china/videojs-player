import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'ReactVideoPlayer',
  outFileName: 'videojs-player',
  banner: false,
  entry: './src/index.tsx',
  outDir: './dist',
  targets: ['esm', 'cjs', 'umd'],
  external: ['react', 'video.js', '@types/video.js'],
  globals: {
    react: 'React',
    'video.js': 'videojs'
  },
  exports: 'named',
  ts: {}
})
