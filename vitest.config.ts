import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      cleanOnRerun: true,
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'html']
    },
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 20000
  }
})
