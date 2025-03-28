import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
/**
 * Props for the playback controls container
 */
export type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base component for laying out audio player controls
 */
export function AudioPlayerControls<T extends ElementType>(props: AudioPlayerControlsProps<T>) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center justify-center gap-1 p-4 text-2xl', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}
