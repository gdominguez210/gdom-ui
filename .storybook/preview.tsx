import type { Preview } from '@storybook/react';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Overview',
          ['Introduction', 'Getting Started', 'Releases'],
          'Core Concepts',
          [
            'Introduction',
            'Composability Over Configuration',
            'Two-Tier Components',
            'Polymorphic Components',
            'Custom Hooks',
            'Styling Approach',
            'Accessibility',
            'Code Splitting',
          ],
          '*',
        ],
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
