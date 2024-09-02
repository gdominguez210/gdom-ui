/* eslint-disable import/no-extraneous-dependencies, react/jsx-props-no-spreading */
import type { StoryObj, Meta } from '@storybook/react';
import { Badge as BadgeComponent } from '@lib/Badge';

export default {
  title: 'components/Badge',
  component: BadgeComponent,
} as Meta<typeof BadgeComponent>;

export const Badge: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
  },
};

export const BadgeNeutral: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'neutral',
  },
};

export const BadgeDanger: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'danger',
  },
};

export const BadgeWarning: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'warning',
  },
};

export const BadgeSuccess: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'success',
  },
};

export const BadgeBrand: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    variant: 'brand',
  },
};

export const BadgeSmall: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    size: 'sm',
  },
};

export const BadgeMedium: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    size: 'md',
  },
};

export const BadgeLarge: StoryObj<typeof BadgeComponent> = {
  args: {
    children: 'Label',
    size: 'lg',
  },
};
