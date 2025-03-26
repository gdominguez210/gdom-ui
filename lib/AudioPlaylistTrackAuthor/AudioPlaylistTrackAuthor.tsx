import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerAuthorPrimitive } from '@lib/AudioPlayerAuthor/AudioPlayerAuthor';

/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorProps<T extends ElementType = 'span'> = {
  /** Element to render as @default span */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Track author component specifically styled for playlist tracks
 */
export function AudioPlaylistTrackAuthor<T extends ElementType = 'span'>(
  props: AudioPlaylistTrackAuthorProps<T>,
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
