import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const gdomTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'gdom-ui',
  brandUrl: 'https://github.com/gdominguez210/gdom-ui',
  // Use the basePath to generate the correct URL in both dev and production
  brandImage: `logo.svg`,
  brandTarget: '_blank',

  // UI
  appBg: '#F8F8F8',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 4,

  // Text colors
  textColor: '#333333',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#999999',
  barSelectedColor: '#3093fa',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  // Color schemes
  colorPrimary: '#3093fa',
  colorSecondary: '#3093fa',
});

// Apply the theme to Storybook
addons.setConfig({
  theme: gdomTheme,
  sidebar: {
    showRoots: true,
  },
});
