'use client';

import { useAudioPlayerContextTime } from '@/lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerTime } from './useAudioPlayerTime';
import { AudioPlayerTimePrimitive } from './AudioPlayerTimePrimitive';
import { cn } from '@/utils/cn';

import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the time display component (current time and duration from context)
 */
export type AudioPlayerTimeProps = PolymorphicProps<'span'>;

/**
 * Displays the current playback time and total duration from context
 */
const _AudioPlayerTime = (props: AudioPlayerTimeProps) => {
  const { currentTime, duration, previewTime } = useAudioPlayerContextTime();

  const _currentTime = previewTime ?? currentTime;

  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({
    currentTime: _currentTime,
    duration,
  });

  return (
    <AudioPlayerTimePrimitive {...props}>
      <span className={cn(previewTime && 'opacity-80')}>{currentTimeDisplay}</span> /{' '}
      <span>{durationDisplay}</span>
    </AudioPlayerTimePrimitive>
  );
};

_AudioPlayerTime.displayName = 'AudioPlayerTime';

export const AudioPlayerTime = _AudioPlayerTime as PolymorphicComponent<'span'>;
