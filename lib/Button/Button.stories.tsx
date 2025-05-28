import type { StoryObj, Meta } from '@storybook/react-vite';
import type { ReactElement } from 'react';
import { Button as ButtonComponent, type ButtonProps } from './Button';
import { IconLibrary } from '@/lib/IconLibrary/IconLibrary';
import { sizes } from '@/lib/Button/data';
import { type HTMLAttributes, Fragment } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const gridHeaderCols = ['Medium', 'Large', 'Extra Large', '2 Extra Large'];
const gridBodyRows: [string, (props: ButtonProps) => ReactElement][] = [
  ['Normal', (props: ButtonProps) => <ButtonComponent {...props}>Button CTA</ButtonComponent>],
  [
    'Hover',
    (props) => (
      <ButtonComponent
        className="pseudo-hover"
        {...props}
      >
        Button CTA
      </ButtonComponent>
    ),
  ],
  [
    'Focus',
    (props) => (
      <ButtonComponent
        className="pseudo-focus"
        {...props}
      >
        Button CTA
      </ButtonComponent>
    ),
  ],
  [
    'Disabled',
    (props) => (
      <ButtonComponent
        disabled
        {...props}
      >
        Button CTA
      </ButtonComponent>
    ),
  ],
  [
    'With Icon',
    (props) => (
      <ButtonComponent {...props}>
        <IconLibrary name="star-line" />
        Button CTA
      </ButtonComponent>
    ),
  ],
  [
    'Icon Only',
    (props) => (
      <ButtonComponent
        aria-label="Button CTA"
        iconOnly
        {...props}
      >
        <IconLibrary name="star-line" />
      </ButtonComponent>
    ),
  ],
];

const gridStartStyles = {
  rows: [
    'row-start-1',
    'row-start-2',
    'row-start-3',
    'row-start-4',
    'row-start-5',
    'row-start-6',
    'row-start-7',
  ],
  cols: [
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ],
};

const buttonVariantArgTypes = {
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
  'aria-label': {
    table: { disable: true },
  },
  as: {
    table: { disable: true },
  },
};

interface GridProps extends HTMLAttributes<HTMLElement> {}

function Grid(props: GridProps) {
  const { children, className } = props;

  return (
    <div className={twMerge(clsx('grid grid-cols-5 grid-rows-7 gap-3', className))}>{children}</div>
  );
}

interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  index?: number;
  colOffset?: number;
  rowOffset?: number;
}

function GridItem(props: GridItemProps) {
  const { children, className, index, rowOffset, colOffset, ...restProps } = props;

  const rowStyle =
    typeof index === 'number' && typeof rowOffset === 'number'
      ? gridStartStyles.rows[index + rowOffset]
      : null;

  const colStyle =
    typeof index === 'number' && typeof colOffset === 'number'
      ? gridStartStyles.cols[index + colOffset]
      : null;

  return (
    <div
      className={clsx('font-medium', rowStyle, colStyle, className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

export default {
  title: 'components/Button',
  component: ButtonComponent,
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
} as Meta<typeof ButtonComponent>;

/** Configurable Button Sandbox */
export const ButtonSandbox: StoryObj<typeof ButtonComponent> = {
  argTypes: {
    children: {
      control: false,
      table: { disable: true },
    },
    'aria-label': {
      description: 'The label for the button, required for icon-only buttons',
      control: 'text',
      if: { arg: 'iconOnly', eq: true },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'linkColor', 'linkGray'],
    },
    size: {
      control: 'select',
      options: sizes,
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button CTA',
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const PrimaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default, high-visibility button for primary actions. Use for main call-to-action buttons and the most important actions in your UI.',
      },
    },
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
            key={col}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <Fragment key={label}>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem key={size}>{button({ size, variant: 'primary' })}</GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
    );
  },
};

export const SecondaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Used for secondary or alternative actions. These buttons have lower visual prominence than primary buttons but are still clearly interactive.',
      },
    },
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
            key={col}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <Fragment key={label}>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem key={size}>{button({ size, variant: 'secondary' })}</GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
    );
  },
};

export const TertiaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lower-emphasis button that maintains interactivity. Useful for less important actions that should still be readily available.',
      },
    },
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
            key={col}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <Fragment key={label}>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem key={size}>{button({ size, variant: 'tertiary' })}</GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
    );
  },
};

export const DestructiveButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  parameters: {
    docs: {
      description: {
        story:
          'For actions with permanent or potentially negative consequences. Use for delete, remove, or other destructive operations that users should consider carefully.',
      },
    },
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
            key={col}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <Fragment key={label}>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem key={size}>{button({ size, variant: 'destructive' })}</GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
    );
  },
};

export const ColoredLinkButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Link-styled buttons with color highlight for navigation or subtle actions. Use when you want an action to appear as a link but maintain button behavior.',
      },
    },
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
            key={col}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <Fragment key={label}>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem key={size}>{button({ size, variant: 'linkColor' })}</GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
    );
  },
};

export const GrayLinkButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Neutral gray link-styled buttons for less prominent navigation or actions. These provide the lowest visual prominence while still being recognizable as interactive elements.',
      },
    },
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
            key={col}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <Fragment key={label}>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem key={size}>{button({ size, variant: 'linkGray' })}</GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
    );
  },
};
