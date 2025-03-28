import { type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { type AudioPlaylistExpandableContainerProps } from './AudioPlaylistExpandableContainer';
/**
 * Props for the expandable container primitive component
 */
export type AudioPlaylistExpandableContainerPrimitiveProps<T extends ElementType = 'div'> =
  AudioPlaylistExpandableContainerProps<T> & {
    isExpanded?: boolean;
  };

/**
 * Primitive container component that can expand/collapse its content
 * This component is purely presentational and can be server-rendered
 */
export function AudioPlaylistExpandableContainerPrimitive<T extends ElementType = 'div'>(
  props: AudioPlaylistExpandableContainerPrimitiveProps<T>,
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
