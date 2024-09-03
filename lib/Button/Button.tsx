import { type Ref, forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

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
type Size = SizesAsTypes[number];

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
      icon?: false;
      'aria-label'?: string;
    }
  | {
      icon?: true;
      'aria-label': string;
    };

export type ButtonProps = CommonButtonProps & iconButtonAccessibleProps;

const styles = {
  base: 'inline-flex justify-center items-center rounded font-medium focus-visible:outline-none',
  primary: 'bg-indigo-700 hover:bg-indigo-800 focus:bg-indigo-800 active:bg-indigo-800 text-white',
  secondary:
    'bg-white hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50 border-[0.5px] hover:border focus:border active:border border-solid border-neutral-200',
  tertiary: 'text-indigo-700 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50',
  destructive:
    'text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 focus:shadow-red-700/12',
  linkColor: 'text-indigo-700 hover:text-indigo-800 focus:text-indigo-800 active:text-indigo-800',
  linkGray:
    'text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 active:text-neutral-900',
  disabled: 'bg-neutral-100 text-neutral-400 pointer-events-none',
  md: {
    padding: 'px-3.5 py-2.5',
    gap: 'gap-1',
    fontSize: 'text-sm',
    icon: 'p-2.5 gap-2',
  },
  lg: {
    padding: 'px-4 py-2.5',
    gap: 'gap-1.5',
    fontSize: 'text-base',
    icon: 'p-3 gap-2',
  },
  xl: {
    padding: 'px-5 py-3',
    gap: 'gap-1.5',
    fontSize: 'text-base',
    icon: 'p-3.5 gap-2',
  },
  xxl: {
    padding: 'px-6 py-4',
    gap: 'gap-2.5',
    fontSize: 'text-lg',
    icon: 'p-4 gap-2',
  },
  boxShadow: {
    standard:
      'focus:shadow-[0px_0px_0px_4px_rgba(0.2666666805744171,0.2980392277240753,0.9058823585510254,0.12)]',
    // custom value from design mocks
    destructive:
      'focus:shadow-[0px_0px_0px_4px_rgba(0.8509804010391235,0.1764705926179886,0.125490203499794,0.12),0px_0px_0px_1px_rgba(0.8509804010391235,0.1764705926179886,0.125490203499794,1.00)]',
    // custom value from design mocks
  },
} as const;

function _Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const {
    children,
    disabled,
    variant = 'primary',
    size = 'md',
    className,
    icon,
    ...restProps
  } = props;

  const isLinkButton = variant.includes('link');
  const isDestructive = variant === 'destructive';

  return (
    <button
      ref={ref}
      className={twMerge(
        clsx(
          styles.base,
          styles[variant],
          styles[size].gap,
          styles[size].fontSize,
          { [styles[size].padding]: !isLinkButton },
          { [styles[size].icon]: icon },
          { [styles.disabled]: disabled },
          { [styles.boxShadow.standard]: !isDestructive },
          { [styles.boxShadow.destructive]: isDestructive },
          className,
        ),
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(_Button);

Button.displayName = 'Button';
