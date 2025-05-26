import type { ComponentPropsWithRef, ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

export type CanvasProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

export function Canvas<T extends ElementType = 'div'>(props: CanvasProps<T>) {
  const { as = 'section', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
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
    </Polymorphic>
  );
}
