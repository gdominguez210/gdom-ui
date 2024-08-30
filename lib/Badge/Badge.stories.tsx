/* eslint-disable import/no-extraneous-dependencies, react/jsx-props-no-spreading */
import type { StoryObj, Meta } from '@storybook/react';
import { Badge as BadgeComponent } from  '@lib/Badge';

export default {
  title: 'components/Badge',
  component: BadgeComponent,
  // parameters: { layout: "fullscreen" },
} as Meta<typeof BadgeComponent>;

export const Badge: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label Text'
  }
};
