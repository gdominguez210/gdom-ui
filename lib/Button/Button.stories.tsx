import type { Meta, StoryObj } from '@storybook/react';

import { Button as ButtonComponent, type ButtonProps } from './Button';
import { Icon } from '@lib/Icon';

export default {
  title: 'components/Button',
  component: ButtonComponent,
} as Meta<typeof ButtonComponent>;

export const ButtonDefault: StoryObj<typeof ButtonComponent> = {
  args: {
    children: <>Button CTA</>,
  },
};

export const ButtonWithIcon: StoryObj<typeof ButtonComponent> = {
  args: {
    children: (
      <>
        <Icon name="star-line" />
        Button CTA
        <Icon name="star-line" />
      </>
    ),
  },
};

export const ButtonIcon: StoryObj<typeof ButtonComponent> = {
  render: (args) => {
    const { icon = true, ...restArgs } = args;
    return (
      <ButtonComponent
        icon
        aria-label="Example Icon Button"
        {...restArgs}
      >
        <Icon name="star-line" />
      </ButtonComponent>
    );
  },
};

export const ButtonHover: StoryObj<typeof ButtonComponent> = {
  args: {
    children: <>Button CTA</>,
    className: 'pseudo-hover',
  },
};

export const ButtonFocused: StoryObj<typeof ButtonComponent> = {
  args: {
    children: <>Button CTA</>,
    className: 'pseudo-focus',
  },
};

export const ButtonDisabled: StoryObj<typeof ButtonComponent> = {
  args: {
    children: <>Button CTA</>,
    disabled: true,
  },
};
