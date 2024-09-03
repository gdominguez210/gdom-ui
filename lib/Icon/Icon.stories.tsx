/* eslint-disable import/no-extraneous-dependencies, react/jsx-props-no-spreading */
import type { StoryObj, Meta } from '@storybook/react';
import { Icon as IconComponent } from '@lib/Icon';

export default {
  title: 'components/Icon',
  component: IconComponent,
} as Meta<typeof IconComponent>;

export const Icon: StoryObj<typeof IconComponent> = {
  args: {
    name: 'star-line',
  },
};
