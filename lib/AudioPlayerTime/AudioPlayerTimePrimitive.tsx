import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the time display primitive component
 */
export type AudioPlayerTimePrimitiveProps<T extends ElementType = 'span'> = {
  /** Element to render as @default span */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying formatted audio playback time
 */
export function AudioPlayerTimePrimitive<T extends ElementType>(
  props: AudioPlayerTimePrimitiveProps<T>,
) {
  const { as: Element = 'span', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'line-clamp-1 inline-block min-w-[6ch] truncate font-mono text-sm tabular-nums',
          className,
        ),
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
}
