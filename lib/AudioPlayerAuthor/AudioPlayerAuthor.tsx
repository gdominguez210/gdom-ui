import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

/**
 * Props for the track author component
 */
export type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
  /** Element to render as @default p */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying author information with appropriate styling
 */
export function AudioPlayerAuthorPrimitive<T extends ElementType>(
  props: AudioPlayerAuthorProps<T>,
) {
  const { as: Element = 'p', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('line-clamp-1 text-sm text-gray-400', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

/**
 * Displays the author of the current audio track
 * Returns null if no author is available
 */
export function AudioPlayerAuthor<T extends ElementType = 'p'>(props: AudioPlayerAuthorProps<T>) {
  const { currentTrack: { author } = {} } = useAudioPlayerContextTrack();

  if (!author) return null;

  return (
    <AudioPlayerAuthorPrimitive
      {...props}
      title={author}
    >
      {author}
    </AudioPlayerAuthorPrimitive>
  );
}
