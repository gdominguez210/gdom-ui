import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the audio playlist primitive component
 */
export type AudioPlaylistProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying a playlist of audio tracks, providing the essential markup
 */
export function AudioPlaylist<T extends ElementType = 'div'>(props: AudioPlaylistProps<T>) {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(
        clsx('flex flex-col border-slate-600 bg-slate-800 text-neutral-100', className),
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
}
