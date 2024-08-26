import { type Ref, forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The color of the button.
   */
  color?: 'primary' | 'success' | 'info' | 'warning' | 'error';

  /**
   * The size of the button.
   */
  size?: 'small' | 'medium' | 'large';
}

const variants = {
  base: 'text-white rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-event-none',
  primary: 'bg-indigo-500 hover:bg-indigo-500/90',
  success: 'bg-green-500 hover:bg-green-500/90',
  info: 'bg-blue-500 hover:bg-blue-500/90',
  warning: 'bg-amber-500 hover:bg-amber-500/90',
  error: 'bg-red-500 hover:bg-red-500/90',
  small: 'px-2.5 py-1.5 text-xs',
  medium: 'px-3.5 py-2 text-sm',
  large: 'px-4 py-2 text-base',
} as const;

function _Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { color = 'primary', size = 'medium', className, ...restProps } = props;

    return <button
      ref={ref}
      className={twMerge(clsx(variants.base, variants[color], variants[size], className))}
      {...restProps}
    />
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(_Button);

Button.displayName = 'Button';
