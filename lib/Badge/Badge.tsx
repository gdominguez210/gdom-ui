import { type ElementType } from 'react';
import { cva } from 'class-variance-authority';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

export type BadgeProps<T extends ElementType = 'span'> = PolymorphicProps<T> & {
  /** @default neutral */
  variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'primary' | 'outline';
  /** @default md */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

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

export function Badge<T extends ElementType = 'span'>(props: BadgeProps<T>) {
  const {
    as = 'span',
    children,
    className,
    variant = 'neutral',
    size = 'md',
    ...restProps
  } = props;

  return (
    <Polymorphic
      as={as}
      className={badgeStyles({ variant, size, className })}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
