import { addons, type State } from 'storybook/manager-api';
import { themes } from 'storybook/theming';
import { create } from 'storybook/theming/create';

const defaultTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'gdom-ui',
  // brandUrl: 'https://github.com/gdominguez210/gdom-ui',
  // Use the basePath to generate the correct URL in both dev and production
  brandImage: `logo.svg`,
  // brandTarget: '_blank',

  // UI
  // appBg: '#F8F8F8',
  // appContentBg: '#FFFFFF',
  // appBorderColor: '#E0E0E0',
  // appBorderRadius: 4,

  // // Text colors
  // textColor: '#333333',
  // textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  // barTextColor: '#999999',
  // barSelectedColor: '#2b7fff',
  // barHoverColor: '#bedbff',
  // barBg: '#FFFFFF',

  // Form colors
  // inputBg: '#FFFFFF',
  // inputBorder: '#E0E0E0',
  // inputTextColor: '#333333',
  // inputBorderRadius: 4,

  // Color schemes
  // colorPrimary: '#2b7fff',
  // colorSecondary: '#193cb8',
});

// Apply the theme to Storybook
addons.setConfig({
  theme: defaultTheme,
  sidebar: {
    showRoots: true,
  },
  layoutCustomisations: {
    showSidebar(state: State, defaultValue: boolean) {
      if (state.path === '/' || state.storyId === 'overview-introduction--docs') {
        return false;
      }

      return defaultValue;
    },
    showToolbar(state: State, defaultValue: boolean) {
      if (state.path === '/' || state.viewMode === 'docs') {
        return false;
      }

      return defaultValue;
    },
  },
});
