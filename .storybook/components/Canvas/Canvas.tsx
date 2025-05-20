import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
type CanvasProps = ComponentPropsWithRef<'div'>;

export function Canvas(props: CanvasProps) {
  const { children, className, ...rest } = props;

  return (
    <section
      className={twMerge(
        clsx(
          'mt-[24px] mb-[40px] rounded-md border-[1px_1px_1px] border-[rgba(38,85,115,0.15)] bg-white p-[34px] shadow-[0px_1px_3px_0px_rgba(38,85,115,0.15)]',
          className,
        ),
      )}
      data-custom-canvas
      {...rest}
    >
      {children}
    </section>
  );
}
