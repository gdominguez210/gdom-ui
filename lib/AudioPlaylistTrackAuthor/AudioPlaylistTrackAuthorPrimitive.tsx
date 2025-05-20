import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerAuthorPrimitive } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthorPrimitive';

/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorPrimitiveProps<T extends ElementType = 'span'> = {
  /** Element to render as @default span */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Track author component specifically styled for playlist tracks
 */
export function AudioPlaylistTrackAuthorPrimitive<T extends ElementType = 'span'>(
  props: AudioPlaylistTrackAuthorPrimitiveProps<T>,
) {
  const { as, className, children, ...restProps } = props;

  return (
    <AudioPlayerAuthorPrimitive
      as={as}
      className={twMerge(clsx('text-xs', className))}
      {...restProps}
    >
      {children}
    </AudioPlayerAuthorPrimitive>
  );
}
