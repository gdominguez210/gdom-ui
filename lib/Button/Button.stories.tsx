import type { Meta, StoryObj } from '@storybook/react';

import { Button as ButtonComponent, type ButtonProps } from './Button';
import { Icon } from '@lib/Icon';
import { sizes } from './Button';

const gridHeaderRows = ['Medium', 'Large', 'Extra Large', '2 Extra Large'];
const gridBodyRows = [
  {
    label: 'Normal',
    render: (props: ButtonProps) => <ButtonComponent {...props}>Button CTA</ButtonComponent>,
  },
  {
    label: 'Hover',
    render: (props: ButtonProps) => (
      <ButtonComponent
        className="pseudo-hover"
        {...props}
      >
        Button CTA
      </ButtonComponent>
    ),
  },
  {
    label: 'Focus',
    render: (props: ButtonProps) => (
      <ButtonComponent
        className="pseudo-focus"
        {...props}
      >
        Button CTA
      </ButtonComponent>
    ),
  },
  {
    label: 'Disabled',
    render: (props: ButtonProps) => (
      <ButtonComponent
        disabled
        {...props}
      >
        Button CTA
      </ButtonComponent>
    ),
  },
  {
    label: 'With Icon',
    render: (props: ButtonProps) => (
      <ButtonComponent {...props}>
        <Icon name="star-line" />
        Button CTA
      </ButtonComponent>
    ),
  },
  {
    label: 'Icon Only',
    render: (props: ButtonProps) => (
      <ButtonComponent
        aria-label="Button CTA"
        iconOnly
        {...props}
      >
        <Icon name="star-line" />
      </ButtonComponent>
    ),
  },
];

const gridStyles = {
  rows: {
    '1': 'row-start-1',
    '2': 'row-start-2',
    '3': 'row-start-3',
    '4': 'row-start-4',
    '5': 'row-start-5',
    '6': 'row-start-6',
    '7': 'row-start-7',
  },
  cols: {
    '1': 'col-start-1',
    '2': 'col-start-2',
    '3': 'col-start-3',
    '4': 'col-start-4',
    '5': 'col-start-5',
    '6': 'col-start-6',
    '7': 'col-start-7',
  },
};

export default {
  title: 'components/Button',
  component: ButtonComponent,
} as Meta<typeof ButtonComponent>;

/** Configurable Button Sandbox */
export const ButtonSandbox: StoryObj<typeof ButtonComponent> = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: <>Button CTA</>,
  },
};

export const PrimaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    iconOnly: {
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-5 grid-rows-7 gap-3">
        {gridHeaderRows.map((row, i) => (
          <div
            className={`${gridStyles.cols[String(i + 2) as keyof typeof gridStyles.cols]} font-medium`}
          >
            {row}
          </div>
        ))}
        {gridBodyRows.map((row, i) => {
          return (
            <>
              <div
                className={`${gridStyles.rows[String(i + 2) as keyof typeof gridStyles.rows]} font-medium`}
              >
                {row.label}
              </div>
              {sizes.map((size) => (
                <div
                  className={gridStyles.rows[String(i + 2) as keyof typeof gridStyles.rows]}
                  key={`${row.label}-${size}`}
                >
                  {row.render({ size, variant: 'primary' })}
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  },
};

export const SecondaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    iconOnly: {
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-5 grid-rows-7 gap-3">
        {gridHeaderRows.map((row, i) => (
          <div className={`col-start-${i + 2} font-medium`}>{row}</div>
        ))}
        {gridBodyRows.map((row, i) => {
          return (
            <>
              <div className={`row-start-${i + 2} font-medium`}>{row.label}</div>
              {sizes.map((size) => (
                <div
                  className={`row-start-${i + 2}`}
                  key={`${row.label}-${size}`}
                >
                  {row.render({ size, variant: 'secondary' })}
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  },
};

export const TertiaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    iconOnly: {
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-5 grid-rows-7 gap-3">
        {gridHeaderRows.map((row, i) => (
          <div className={`col-start-${i + 2} font-medium`}>{row}</div>
        ))}
        {gridBodyRows.map((row, i) => {
          return (
            <>
              <div className={`row-start-${i + 2} font-medium`}>{row.label}</div>
              {sizes.map((size) => (
                <div
                  className={`row-start-${i + 2}`}
                  key={`${row.label}-${size}`}
                >
                  {row.render({ size, variant: 'tertiary' })}
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  },
};

export const DestructiveButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    iconOnly: {
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-5 grid-rows-7 gap-3">
        {gridHeaderRows.map((row, i) => (
          <div className={`col-start-${i + 2} font-medium`}>{row}</div>
        ))}
        {gridBodyRows.map((row, i) => {
          return (
            <>
              <div className={`row-start-${i + 2} font-medium`}>{row.label}</div>
              {sizes.map((size) => (
                <div
                  className={`row-start-${i + 2}`}
                  key={`${row.label}-${size}`}
                >
                  {row.render({ size, variant: 'destructive' })}
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  },
};

export const ColoredLinkButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    iconOnly: {
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-5 grid-rows-7 gap-3">
        {gridHeaderRows.map((row, i) => (
          <div className={`col-start-${i + 2} font-medium`}>{row}</div>
        ))}
        {gridBodyRows.map((row, i) => {
          return (
            <>
              <div className={`row-start-${i + 2} font-medium`}>{row.label}</div>
              {sizes.map((size) => (
                <div
                  className={`row-start-${i + 2}`}
                  key={`${row.label}-${size}`}
                >
                  {row.render({ size, variant: 'linkColor' })}
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  },
};

export const GrayLinkButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    size: {
      table: { disable: true },
    },
    iconOnly: {
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-5 grid-rows-7 gap-3">
        {gridHeaderRows.map((row, i) => (
          <div className={`col-start-${i + 2} font-medium`}>{row}</div>
        ))}
        {gridBodyRows.map((row, i) => {
          return (
            <>
              <div className={`row-start-${i + 2} font-medium`}>{row.label}</div>
              {sizes.map((size) => (
                <div
                  className={`row-start-${i + 2}`}
                  key={`${row.label}-${size}`}
                >
                  {row.render({ size, variant: 'linkGray' })}
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  },
};
