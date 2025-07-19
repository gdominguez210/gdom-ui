'use client';

import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { AudioPlayerAuthorPrimitive } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthorPrimitive';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the track author component
 */
export type AudioPlayerAuthorProps = PolymorphicProps<'span'>;

/**
 * Displays the author of the current audio track
 * Returns null if no author is available
 */
const _AudioPlayerAuthor = (props: AudioPlayerAuthorProps) => {
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
};

export const AudioPlayerAuthor = _AudioPlayerAuthor as PolymorphicComponent<'span'>;
