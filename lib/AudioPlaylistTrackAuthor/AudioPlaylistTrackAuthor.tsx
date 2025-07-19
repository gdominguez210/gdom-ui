'use client';

import { AudioPlaylistTrackAuthorPrimitive } from '@/lib/AudioPlaylistTrackAuthor/AudioPlaylistTrackAuthorPrimitive';
import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorProps = PolymorphicProps<'span'>;

/**
 * Audio playlist track author component
 */
const _AudioPlaylistTrackAuthor = (props: AudioPlaylistTrackAuthorProps) => {
  const {
    track: { author },
  } = useAudioPlaylistTrackContext();

  return <AudioPlaylistTrackAuthorPrimitive {...props}>{author}</AudioPlaylistTrackAuthorPrimitive>;
};

_AudioPlaylistTrackAuthor.displayName = 'AudioPlaylistTrackAuthor';

export const AudioPlaylistTrackAuthor = _AudioPlaylistTrackAuthor as PolymorphicComponent<'span'>;
