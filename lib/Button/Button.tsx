import { type Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';

export const variants = [
  'primary',
  'secondary',
  'tertiary',
  'destructive',
  'linkColor',
  'linkGray',
] as const;

export const sizes = ['md', 'lg', 'xl', 'xxl'] as const;

type VariantsAsTypes = typeof variants;
type Variant = VariantsAsTypes[number];

type SizesAsTypes = typeof sizes;
export type Size = SizesAsTypes[number];

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The type of the button.
   * @default primary
   */
  variant?: Variant;

  /**
   * The size of the button.
   * @default md
   */
  size?: Size;
}

type iconButtonAccessibleProps =
  | {
      /**
       * Switches to use icon button styling
       * @default false
       */
      iconOnly?: false;
      'aria-label'?: string;
    }
  | {
      iconOnly?: true;
      'aria-label': string;
    };

export type ButtonProps = CommonButtonProps & iconButtonAccessibleProps;

const buttonStyles = cva(
  ['inline-flex justify-center items-center rounded font-medium focus-visible:outline-none'],
  {
    variants: {
      variant: {
        primary:
          'bg-indigo-700 hover:bg-indigo-800 focus:bg-indigo-800 active:bg-indigo-800 text-white',
        secondary:
          'bg-white hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50 border-[0.5px] hover:border focus:border active:border border-solid border-neutral-200',
        tertiary: 'text-indigo-700 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50',
        destructive:
          'text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 focus:shadow-red-700/12',
        linkColor:
          'text-indigo-700 hover:text-indigo-800 focus:text-indigo-800 active:text-indigo-800',
        linkGray:
          'text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 active:text-neutral-900',
      },
      size: {
        md: 'gap-1 text-sm',
        lg: 'gap-1.5 text-base',
        xl: 'gap-2 text-base',
        xxl: 'gap-2.5 text-lg',
      },
      disabled: {
        true: 'text-neutral-400 pointer-events-none',
        false: '',
      },
      iconOnly: {
        true: 'gap-2',
        false: '',
      },
      isDestructive: {
        true: 'focus:shadow-[0px_0px_0px_4px_rgba(0.8509804010391235,0.1764705926179886,0.125490203499794,0.12),0px_0px_0px_1px_rgba(0.8509804010391235,0.1764705926179886,0.125490203499794,1.00)]',
        false:
          'focus:shadow-[0px_0px_0px_4px_rgba(0.2666666805744171,0.2980392277240753,0.9058823585510254,0.12)]',
      },
    },
    compoundVariants: [
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive'],
        size: 'md',
        className: 'px-3.5 py-2.5',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive'],
        size: 'lg',
        className: 'px-4 py-2.5',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive'],
        size: 'xl',
        className: 'px-5 py-3',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive'],
        size: 'xxl',
        className: 'px-6 py-4',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive'],
        disabled: true,
        className: 'bg-neutral-100 text-neutral-400 pointer-events-none',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive', 'linkColor', 'linkGray'],
        iconOnly: true,
        size: 'md',
        className: 'p-2.5 gap-2',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive', 'linkColor', 'linkGray'],
        iconOnly: true,
        size: 'lg',
        className: 'p-3 gap-2',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive', 'linkColor', 'linkGray'],
        iconOnly: true,
        size: 'xl',
        className: 'p-3.5',
      },
      {
        variant: ['primary', 'secondary', 'tertiary', 'destructive', 'linkColor', 'linkGray'],
        iconOnly: true,
        size: 'xxl',
        className: 'p-4',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

function _Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const {
    children,
    disabled,
    variant = 'primary',
    size = 'md',
    className,
    iconOnly,
    ...restProps
  } = props;

  const isDestructive = variant === 'destructive';

  return (
    <button
      ref={ref}
      className={twMerge(
        buttonStyles({ variant, size, disabled, iconOnly, isDestructive, className }),
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(_Button);

Button.displayName = 'Button';
