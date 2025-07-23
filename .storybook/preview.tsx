import type { Preview } from '@storybook/react-vite';
import { DocsContainer } from '@storybook/addon-docs/blocks';
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
      expanded: true,
      sort: 'alpha',
    },
    docs: {
      story: {
        inline: true,
      },
      source: {
        transform: async (source) => {
          const prettier = await import('prettier/standalone');
          const prettierPluginBabel = await import('prettier/plugins/babel');
          const prettierPluginEstree = await import('prettier/plugins/estree');

          return prettier.format(source, {
            parser: 'babel',
            plugins: [prettierPluginBabel.default, prettierPluginEstree.default],
          });
        },
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
