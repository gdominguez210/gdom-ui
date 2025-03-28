'use client';

import { type ChangeEventHandler, type ComponentPropsWithRef, useCallback } from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/useAudioPlayerProgressBar';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';
import { useComposedRefs } from '@lib/useComposedRefs';
import { AudioPlayerProgressBarPrimitive } from './AudioPlayerProgressBarPrimitive';

/**
 * Props for the progress bar component
 */
export type AudioPlayerProgressBarProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

/**
 * Progress bar that integrates with the audio player context for playback control
 */
export function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps) {
  const { onChange, ref, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();

  const { isPlaying } = useAudioPlayerContextAudio();

  const { duration, seek } = useAudioPlayerContextTime();

  const { handleProgressChange } = useAudioPlayerProgressBar({
    audioRef,
    duration,
    isPlaying,
    onProgressChange: seek,
    progressBarRef,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      handleProgressChange(e);
      onChange?.(e);
    },
    [handleProgressChange, onChange],
  );

  const composedRef = useComposedRefs(progressBarRef, ref);

  return (
    <AudioPlayerProgressBarPrimitive
      {...restProps}
      onChange={handleChange}
      ref={composedRef}
    />
  );
}
