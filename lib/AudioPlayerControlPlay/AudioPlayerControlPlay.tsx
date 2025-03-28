'use client';

import { type MouseEventHandler, type RefObject, useCallback } from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerControlPlay } from './useAudioPlayerControlPlay';
import {
  AudioPlayerControlPlayPrimitive,
  type AudioPlayerControlPlayPrimitiveProps,
} from './AudioPlayerControlPlayPrimitive';

/**
 * Props for the play/pause control component
 */
export type AudioPlayerControlPlayProps = Omit<AudioPlayerControlPlayPrimitiveProps, 'active'>;

/**
 * Play/pause control component that integrates with the audio player context
 */
export function AudioPlayerControlPlay(props: AudioPlayerControlPlayProps) {
  const { onClick, ...restProps } = props;
  const { isPlaying, togglePlay } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();
  const { currentTrackIndex } = useAudioPlayerContextTrack();

  useAudioPlayerControlPlay({
    isPlaying,
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    currentTrackIndex,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      togglePlay();
      onClick?.(e);
    },
    [togglePlay, onClick],
  );

  return (
    <AudioPlayerControlPlayPrimitive
      active={isPlaying}
      onClick={handleClick}
      {...restProps}
    />
  );
}
