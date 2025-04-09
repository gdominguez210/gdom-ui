'use client';

import { type MouseEventHandler, useCallback } from 'react';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider';
import {
  AudioPlayerControlLoopPrimitive,
  type AudioPlayerControlLoopPrimitiveProps,
} from './AudioPlayerControlLoopPrimitive';

/**
 * Props for the loop control component
 */
export type AudioPlayerControlLoopProps = Omit<AudioPlayerControlLoopPrimitiveProps, 'active'>;

/**
 * Loop control component that integrates with the audio player context
 */
export function AudioPlayerControlLoop(props: AudioPlayerControlLoopProps) {
  const { onClick, ...restProps } = props;
  const { loop, toggleLoop } = useAudioPlayerContextPlayback();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      toggleLoop();
      onClick?.(e);
    },
    [toggleLoop, onClick],
  );

  return (
    <AudioPlayerControlLoopPrimitive
      active={loop}
      onClick={handleClick}
      {...restProps}
    />
  );
}
