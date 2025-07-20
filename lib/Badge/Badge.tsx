import { type ElementType } from 'react';
import { cva } from 'class-variance-authority';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

type BadgePropsInternal = {
  /** @default neutral */
  variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'primary' | 'outline';
  /** @default md */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

export type BadgeProps<T extends ElementType = 'span'> = PolymorphicProps<T, BadgePropsInternal>;

const badgeStyles = cva(
  'inline-flex items-center rounded-full border border-solid font-normal text-center',
  {
    variants: {
      variant: {
        neutral: 'bg-gray-50 border-neutral-200 text-neutral-600',
        danger: 'bg-red-50 border-red-200 text-red-600',
        warning: 'bg-amber-50 border-amber-200 text-amber-600',
        success: 'bg-green-50 border-green-200 text-green-600',
        primary: 'bg-blue-50 border-blue-200 text-blue-600',
        outline: 'border-neutral-200 text-neutral-600',
      },
      size: {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-0.5',
        lg: 'text-md px-2.5 py-1',
        xl: 'text-lg px-3 py-1.5',
        xxl: 'text-xl px-3.5 py-2',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
);

const _Badge = (props: PolymorphicProps<'span', BadgePropsInternal>) => {
  const {
    as: Element = 'span',
    children,
    className,
    variant = 'neutral',
    size = 'md',
    ...restProps
  } = props;

  return (
    <Element
      className={badgeStyles({ variant, size, className })}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_Badge.displayName = 'Badge';

export const Badge = _Badge as PolymorphicComponent<'span', BadgePropsInternal>;
