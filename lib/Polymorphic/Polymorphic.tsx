import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

export type PolymorphicProps<T extends ElementType> = ComponentPropsWithRef<T> & {
  as?: T;
};

export function Polymorphic<T extends ElementType>(props: PolymorphicProps<T>) {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={twMerge(className)}
      {...rest}
    >
      {children}
    </Element>
  );
}
