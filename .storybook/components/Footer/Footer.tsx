import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type FooterProps = ComponentPropsWithRef<'footer'>;

export function Footer(props: FooterProps) {
  const { className, children, ...rest } = props;

  return (
    <footer
      className={twMerge(
        clsx('flex items-center justify-between gap-4 border-t border-gray-200 p-4', className),
      )}
      {...rest}
    >
      {children}
    </footer>
  );
}
