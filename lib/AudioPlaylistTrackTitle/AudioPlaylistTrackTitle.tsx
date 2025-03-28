import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerTitlePrimitive } from '@lib/AudioPlayerTitle/AudioPlayerTitlePrimitive';

/**
 * Props for the audio playlist track title component
 */
export type AudioPlaylistTrackTitleProps<T extends ElementType = 'span'> = {
  /** Element to render as @default span */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Track title component specifically styled for playlist tracks
 */
export function AudioPlaylistTrackTitle<T extends ElementType = 'span'>(
  props: AudioPlaylistTrackTitleProps<T>,
) {
  const { as, className, children, ...restProps } = props;

  return (
    <AudioPlayerTitlePrimitive
      as={as}
      className={twMerge(clsx('text-sm font-medium leading-tight', className))}
      {...restProps}
    >
      {children}
    </AudioPlayerTitlePrimitive>
  );
}
