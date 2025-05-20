/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { globSync } from 'glob';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import { peerDependencies } from './package.json';

// Dynamically find all barrel files
const entryPoints = globSync('./lib/*/index.ts').reduce((entries, path) => {
  // Extract the folder name from the path
  const pathArray = path.split('/');
  const name = pathArray[1];
  entries[name] = resolve(__dirname, path);
  return entries;
}, {});

//Add the main entry point
entryPoints['index'] = resolve(__dirname, 'lib/index.ts');

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'lib',
      outDir: 'dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx', '**/*.mdx'],
    }), // Output .d.ts files
    tsconfigPaths(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        svgo: false,
        ref: true,
        icon: true,
      },
    }),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: entryPoints,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return `index.${format}.js`;
        }

        return `${entryName}/index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './test/setup.ts',
    coverage: {
      all: false,
      enabled: false,
    },
  },
});
