'use client';

import type { ElementType } from 'react';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import {
  AudioPlayerAuthorPrimitive,
  type AudioPlayerAuthorPrimitiveProps,
} from '@/lib/AudioPlayerAuthor/AudioPlayerAuthorPrimitive';

/**
 * Props for the track author component
 */
export type AudioPlayerAuthorProps<T extends ElementType = 'span'> =
  AudioPlayerAuthorPrimitiveProps<T>;

/**
 * Displays the author of the current audio track
 * Returns null if no author is available
 */
export function AudioPlayerAuthor<T extends ElementType = 'span'>(
  props: AudioPlayerAuthorProps<T>,
) {
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
