import { useAudioPlaylistTrackContext } from '@lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';
import {
  AudioPlaylistTrackTitlePrimitive,
  type AudioPlaylistTrackTitlePrimitiveProps,
} from '@lib/AudioPlaylistTrackTitle/AudioPlaylistTrackTitlePrimitive';
import type { ElementType } from 'react';

export type AudioPlaylistTrackTitleProps<T extends ElementType = 'span'> = Omit<
  AudioPlaylistTrackTitlePrimitiveProps<T>,
  'children'
>;

export function AudioPlaylistTrackTitle<T extends ElementType = 'span'>(
  props: AudioPlaylistTrackTitleProps<T>,
) {
  const {
    track: { title },
  } = useAudioPlaylistTrackContext();

  return (
    <AudioPlaylistTrackTitlePrimitive {...(props as AudioPlaylistTrackTitlePrimitiveProps<T>)}>
      {title}
    </AudioPlaylistTrackTitlePrimitive>
  );
}
