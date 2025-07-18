import { type ComponentPropsWithRef, type ElementType, cloneElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the polymorphic component
 */
export type PolymorphicProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
  /** Element to render as @default div */
  as?: T;
  /** If true, renders as the child element instead of rendering a wrapper */
  asChild?: boolean;
};

export function Polymorphic<T extends ElementType>(props: PolymorphicProps<T>) {
  const { as: Element = 'div', asChild, children, className, ...rest } = props;

  if (asChild) {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ...rest,
        ...(children.props as object),
        className: twMerge((children.props as { className?: string }).className, className),
      });
    } else {
      throw new Error('Polymorphic: asChild prop requires a single valid React element as a child');
    }
  }

  return (
    <Element
      className={twMerge(className)}
      {...rest}
    >
      {children}
    </Element>
  );
}
