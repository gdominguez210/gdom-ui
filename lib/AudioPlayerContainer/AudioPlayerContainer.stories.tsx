import { AudioPlayerContainer } from '@/lib/AudioPlayerContainer/AudioPlayerContainer';
import type { Meta, StoryObj } from '@storybook/react-vite';

export default {
  component: AudioPlayerContainer,
  tags: ['!dev'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside', 'form'],
    },
  },
} as Meta<typeof AudioPlayerContainer>;

export const Default: StoryObj<typeof AudioPlayerContainer> = {};
