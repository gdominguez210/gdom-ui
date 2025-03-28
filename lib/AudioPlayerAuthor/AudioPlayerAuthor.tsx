'use client';

import { type ComponentPropsWithRef, type ElementType } from 'react';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { AudioPlayerAuthorPrimitive } from './AudioPlayerAuthorPrimitive';

/**
 * Props for the track author component
 */
export type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
  /** Element to render as @default p */
  as?: T;
} & ComponentPropsWithRef<T>;

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
