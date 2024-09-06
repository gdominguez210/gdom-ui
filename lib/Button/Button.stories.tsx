import type { Meta, StoryObj } from '@storybook/react';

import { Button as ButtonComponent, type ButtonProps } from './Button';
import { Icon } from '@lib/Icon';
import { sizes } from './Button';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const gridHeaderCols = ['Medium', 'Large', 'Extra Large', '2 Extra Large'];
const gridBodyRows: [string, (props: ButtonProps) => JSX.Element][] = [
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
        <Icon name="star-line" />
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
        <Icon name="star-line" />
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
} as Meta<typeof ButtonComponent>;

/** Configurable Button Sandbox */
export const ButtonSandbox: StoryObj<typeof ButtonComponent> = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: <>Button CTA</>,
  },
};

export const PrimaryButtons: StoryObj<typeof ButtonComponent> = {
  args: {},
  argTypes: {
    ...buttonVariantArgTypes,
  },
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem>{button({ size, variant: 'primary' })}</GridItem>
            ))}
          </>
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
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem>{button({ size, variant: 'secondary' })}</GridItem>
            ))}
          </>
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
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem>{button({ size, variant: 'tertiary' })}</GridItem>
            ))}
          </>
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
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem>{button({ size, variant: 'destructive' })}</GridItem>
            ))}
          </>
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
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem>{button({ size, variant: 'linkColor' })}</GridItem>
            ))}
          </>
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
  render: () => {
    return (
      <Grid>
        {gridHeaderCols.map((col, i) => (
          <GridItem
            index={i}
            colOffset={1}
          >
            {col}
          </GridItem>
        ))}
        {gridBodyRows.map(([label, button], i) => (
          <>
            <GridItem
              index={i}
              rowOffset={1}
            >
              {label}
            </GridItem>
            {sizes.map((size) => (
              <GridItem>{button({ size, variant: 'linkGray' })}</GridItem>
            ))}
          </>
        ))}
      </Grid>
    );
  },
};
