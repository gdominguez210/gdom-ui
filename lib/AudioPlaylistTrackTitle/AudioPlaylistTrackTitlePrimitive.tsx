import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerTitlePrimitive } from '@lib/AudioPlayerTitle/AudioPlayerTitlePrimitive';

/**
 * Props for the audio playlist track title component
 */
export type AudioPlaylistTrackTitlePrimitiveProps<T extends ElementType = 'span'> = {
  /** Element to render as @default span */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Track title component specifically styled for playlist tracks
 */
export function AudioPlaylistTrackTitlePrimitive<T extends ElementType = 'span'>(
  props: AudioPlaylistTrackTitlePrimitiveProps<T>,
) {
  const { as, className, children, ...restProps } = props;

  return (
    <AudioPlayerTitlePrimitive
      as={as}
      className={twMerge(clsx('text-sm leading-tight font-medium', className))}
      {...restProps}
    >
      {children}
    </AudioPlayerTitlePrimitive>
  );
}
