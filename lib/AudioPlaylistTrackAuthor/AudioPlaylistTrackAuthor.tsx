'use client';

import type { ElementType } from 'react';
import {
  AudioPlaylistTrackAuthorPrimitive,
  type AudioPlaylistTrackAuthorPrimitiveProps,
} from '@/lib/AudioPlaylistTrackAuthor/AudioPlaylistTrackAuthorPrimitive';
import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';

/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorProps<T extends ElementType = 'span'> = Omit<
  AudioPlaylistTrackAuthorPrimitiveProps<T>,
  'children'
>;

/**
 * Audio playlist track author component
 */
export function AudioPlaylistTrackAuthor<T extends ElementType = 'span'>(
  props: AudioPlaylistTrackAuthorProps<T>,
) {
  const {
    track: { author },
  } = useAudioPlaylistTrackContext();

  return (
    <AudioPlaylistTrackAuthorPrimitive {...(props as AudioPlaylistTrackAuthorPrimitiveProps<T>)}>
      {author}
    </AudioPlaylistTrackAuthorPrimitive>
  );
}
