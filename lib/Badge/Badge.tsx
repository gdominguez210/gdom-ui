import { type ElementType, type HTMLAttributes, type Ref, forwardRef } from 'react';
import cn from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /** @default span */
  as?: ElementType;
  /** @default neutral */
  variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'brand';
  /** @default md */
  size?: 'sm' | 'md' | 'lg';
}

const styles = {
  base: 'inline-flex items-center rounded-full border border-solid font-normal text-center',
  neutral: 'bg-gray-50 border-neutral-200 text-neutral-600',
  danger: 'bg-red-50 border-red-200 text-red-600',
  warning: 'bg-amber-50 border-amber-200 text-amber-600',
  success: 'bg-green-50 border-green-200 text-green-600',
  brand: 'bg-indigo-50 border-indigo-50 text-indigo-600',
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-0.5',
  lg: 'text-sm px-2.5 py-1',
} as const;

function _Badge(props: BadgeProps, ref: Ref<HTMLElement>) {
  const {
    as = 'span',
    children,
    className,
    variant = 'neutral',
    size = 'md',
    ...restProps
  } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(cn(styles.base, styles[variant], styles[size], className))}
      {...restProps}
      ref={ref}
    >
      {children}
    </Node>
  );
}

export const Badge = forwardRef<HTMLElement, BadgeProps>(_Badge);

Badge.displayName = 'Badge';
