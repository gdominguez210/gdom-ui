'use client';

import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerTime } from './useAudioPlayerTime';
import {
  AudioPlayerTimePrimitive,
  type AudioPlayerTimePrimitiveProps,
} from './AudioPlayerTimePrimitive';

/**
 * Props for the time display component (current time and duration from context)
 */
export type AudioPlayerTimeProps = Omit<AudioPlayerTimePrimitiveProps, 'currentTime' | 'duration'>;

/**
 * Displays the current playback time and total duration from context
 */
export function AudioPlayerTime(props: AudioPlayerTimeProps) {
  const { currentTime, duration } = useAudioPlayerContextTime();

  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({ currentTime, duration });

  return (
    <AudioPlayerTimePrimitive
      {...props}
      currentTime={currentTimeDisplay}
      duration={durationDisplay}
    />
  );
}
