'use client';
import type { ElementType } from 'react';
import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';
import { AudioPlaylistTrackImagePrimitive } from '@/lib/AudioPlaylistTrackImage/AudioPlaylistTrackImagePrimitive';
import type { AudioPlayerImageProps } from '@/lib/AudioPlayerImage/AudioPlayerImage';

export type AudioPlaylistTrackImageProps<T extends ElementType = 'div'> = AudioPlayerImageProps<T>;

export function AudioPlaylistTrackImage(props: AudioPlaylistTrackImageProps) {
  const {
    active,
    isPlaying,
    track: { thumbnail = '', title },
  } = useAudioPlaylistTrackContext();

  return (
    <AudioPlaylistTrackImagePrimitive
      {...props}
      active={active}
      isPlaying={isPlaying}
      src={thumbnail}
      altText={`${title} thumbnail`}
    />
  );
}
