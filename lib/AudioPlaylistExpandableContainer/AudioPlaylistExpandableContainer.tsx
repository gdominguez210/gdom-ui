import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the expandable container component
 */
export type AudioPlaylistExpandableContainerProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
  /** Whether the content is expanded/visible */
  isExpanded: boolean;
} & ComponentPropsWithRef<T>;

/**
 * Container component that can expand/collapse its content
 */
export function AudioPlaylistExpandableContainer<T extends ElementType = 'div'>(
  props: AudioPlaylistExpandableContainerProps<T>,
) {
  const { as: Element = 'div', isExpanded, children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'relative overflow-hidden shadow-lg transition-all duration-300',
          {
            'max-h-[300px] opacity-100': isExpanded,
            'pointer-events-none max-h-0 opacity-0': !isExpanded,
          },
          className,
        ),
      )}
      aria-hidden={!isExpanded}
      {...restProps}
    >
      {children}
    </Element>
  );
}
