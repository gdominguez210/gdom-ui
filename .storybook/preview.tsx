import type { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/blocks';
import './storybook.css';
import { Copyright } from '@/.storybook/components/Copyright/Copyright';
import { Footer } from '@/.storybook/components/Footer/Footer';
import { Socials } from '@/.storybook/components/Socials/Socials';
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
      container: ({ children, context }) => {
        return (
          <>
            <DocsContainer context={context}>{children}</DocsContainer>
            <Footer>
              <Copyright />
              <Socials />
            </Footer>
          </>
        );
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
