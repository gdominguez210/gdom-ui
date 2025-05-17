import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';
import { join } from 'path';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['./docs/**/*.mdx', '../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  viteFinal: async (config, { configType }) => {
    const _config = {
      ...config,
      plugins: await withoutVitePlugins(config.plugins, ['vite:dts']), // skip dts plugin
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@storybook-components': join(__dirname, './components'),
          '@lib': join(__dirname, '../lib'),
        },
      },
    };

    if (configType === 'PRODUCTION') {
      _config.base = '/gdom-ui/';
    }

    return _config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // Skip node_modules
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      // Include all component documentation, not just props with JSDoc
      shouldRemoveUndefinedFromOptional: true,
      // Better support for generics and forwardRef
      savePropValueAsString: true,
      // Improve handling of complex types
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    },
  },
  staticDirs: ['public'],
};

export default config;
