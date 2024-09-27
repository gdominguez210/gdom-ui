/// <reference types="vitest" />
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { peerDependencies } from './package.json';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }), // Output .d.ts files
    tsconfigPaths(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
        svgo: false,
        ref: true,
        icon: true,
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(__dirname, join('lib', 'index.ts')),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './lib/test/setup.ts',
    coverage: {
      all: false,
      enabled: false,
    },
  },
});
