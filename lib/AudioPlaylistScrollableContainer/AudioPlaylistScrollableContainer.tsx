import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the audio playlist scrollable container component
 */
export type AudioPlaylistScrollableContainerProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
  /** Maximum height for the scrollable container */
  maxHeight?: string;
} & ComponentPropsWithRef<T>;

/**
 * A scrollable container component for audio playlist elements
 * Provides consistent custom scrollbar styling across browsers
 */
export function AudioPlaylistScrollableContainer<T extends ElementType = 'div'>(
  props: AudioPlaylistScrollableContainerProps<T>,
) {
  const {
    as: Element = 'div',
    children,
    className,
    maxHeight = '300px',
    style,
    ...restProps
  } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'overflow-y-auto',
          'scrollbar-thin scrollbar-thumb-slate-400/30 scrollbar-track-slate-800/20 hover:scrollbar-thumb-slate-400/50',
          'scrollbar-thumb-rounded-none',
          className,
        ),
      )}
      style={{
        maxHeight,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export default AudioPlaylistScrollableContainer;
