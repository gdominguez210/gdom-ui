'use client';

import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerTime } from './useAudioPlayerTime';
import {
  AudioPlayerTimePrimitive,
  type AudioPlayerTimePrimitiveProps,
} from './AudioPlayerTimePrimitive';
import { clsx } from 'clsx';

/**
 * Props for the time display component (current time and duration from context)
 */
export type AudioPlayerTimeProps = Omit<AudioPlayerTimePrimitiveProps, 'currentTime' | 'duration'>;

/**
 * Displays the current playback time and total duration from context
 */
export function AudioPlayerTime(props: AudioPlayerTimeProps) {
  const { currentTime, duration, previewTime } = useAudioPlayerContextTime();

  const _currentTime = previewTime ?? currentTime;

  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({
    currentTime: _currentTime,
    duration,
  });

  return (
    <AudioPlayerTimePrimitive {...props}>
      <span className={clsx(previewTime && 'opacity-80')}>{currentTimeDisplay}</span> /{' '}
      <span>{durationDisplay}</span>
    </AudioPlayerTimePrimitive>
  );
}
