'use client';

import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { AudioPlayerTitlePrimitive } from './AudioPlayerTitlePrimitive';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the track title component
 */
export type AudioPlayerTitleProps = PolymorphicProps<'span'>;

/**
 * Displays the title of the current audio track
 * Returns null if no title is available
 */
const _AudioPlayerTitle = (props: AudioPlayerTitleProps) => {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack();

  if (!title) return null;

  return (
    <AudioPlayerTitlePrimitive
      title={title}
      {...props}
    >
      {title}
    </AudioPlayerTitlePrimitive>
  );
};

_AudioPlayerTitle.displayName = 'AudioPlayerTitle';

export const AudioPlayerTitle = _AudioPlayerTitle as PolymorphicComponent<'span'>;
