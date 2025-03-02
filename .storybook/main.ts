import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';
import { join } from 'path';

const config: StorybookConfig = {
  stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  viteFinal: async (config) => ({
    ...config,
    plugins: await withoutVitePlugins(config.plugins, ['vite:dts']), // skip dts plugin
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@storybook-components': join(__dirname, './components'),
      },
    },
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
