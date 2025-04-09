'use client';

import { type MouseEventHandler, useCallback } from 'react';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider';
import {
  AudioPlayerControlShufflePrimitive,
  type AudioPlayerControlShufflePrimitiveProps,
} from './AudioPlayerControlShufflePrimitive';

/**
 * Props for the shuffle control component
 */
export type AudioPlayerControlShuffleProps = Omit<
  AudioPlayerControlShufflePrimitiveProps,
  'active'
>;

/**
 * Shuffle control component that integrates with the audio player context
 */
export function AudioPlayerControlShuffle(props: AudioPlayerControlShuffleProps) {
  const { onClick, ...restProps } = props;
  const { shuffle, toggleShuffle } = useAudioPlayerContextPlayback();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      toggleShuffle();
      onClick?.(e);
    },
    [toggleShuffle, onClick],
  );

  return (
    <AudioPlayerControlShufflePrimitive
      active={shuffle}
      onClick={handleClick}
      {...restProps}
    />
  );
}
