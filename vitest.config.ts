import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@modelforge/generator-csharp': fileURLToPath(
        new URL('./packages/generator-csharp/src/index.ts', import.meta.url),
      ),
      '@modelforge/generator-python': fileURLToPath(
        new URL('./packages/generator-python/src/index.ts', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['apps/**/*.test.{ts,tsx}', 'packages/**/*.test.ts'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
