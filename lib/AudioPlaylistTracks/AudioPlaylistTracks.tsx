'use client';

import { type ElementType, type SyntheticEvent } from 'react';
import { AudioPlaylistTrack } from '@lib/AudioPlaylistTrack';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import {
  AudioPlaylistTracksPrimitive,
  type AudioPlaylistTracksPrimitiveProps,
} from './AudioPlaylistTracksPrimitive';

/**
 * Props for the audio playlist tracks component
 */
export type AudioPlaylistTracksProps<T extends ElementType = 'ul'> =
  AudioPlaylistTracksPrimitiveProps<T>;

/**
 * Component for rendering the scrollable list of playlist tracks,
 * connected to audio player context
 */
export function AudioPlaylistTracks<T extends ElementType = 'ul'>(
  props: AudioPlaylistTracksProps<T>,
) {
  const { onClick, ...restProps } = props;
  const { tracks, currentTrackIndex, setTrackIndex } = useAudioPlayerContextTrack();
  const { isPlaying, play, togglePlay } = useAudioPlayerContextAudio();

  const handleTrackSelect = (index: number) => (e: SyntheticEvent) => {
    setTrackIndex(index);
    currentTrackIndex === index ? togglePlay() : play();
    onClick?.(e);
  };

  if (!tracks?.length) return null;

  return (
    <AudioPlaylistTracksPrimitive {...(restProps as AudioPlaylistTracksPrimitiveProps<T>)}>
      {tracks.map(({ src, title, author, thumbnail }, index) => (
        <AudioPlaylistTrack
          key={`${src}-${index}`}
          title={title}
          author={author}
          thumbnail={thumbnail}
          active={index === currentTrackIndex}
          isPlaying={isPlaying}
          onSelect={handleTrackSelect(index)}
        />
      ))}
    </AudioPlaylistTracksPrimitive>
  );
}
