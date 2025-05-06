'use client';

import { type ChangeEventHandler, type ComponentPropsWithRef, useCallback } from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/useAudioPlayerProgressBar';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
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

  const { isPlaying } = useAudioPlayerContextPlayback();

  const { duration, seek, setPreviewTime } = useAudioPlayerContextTime();

  const { handleProgressChange, handleMouseEnter, handleMouseMove, handleMouseOut, elementRef } =
    useAudioPlayerProgressBar({
      audioRef,
      duration,
      isPlaying,
      onProgressChange: seek,
      progressBarRef,
      onPreviewTimeChange: setPreviewTime,
    });

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      handleProgressChange(e);
      onChange?.(e);
    },
    [handleProgressChange, onChange],
  );

  const composedRef = useComposedRefs(progressBarRef, ref, elementRef);

  return (
    <AudioPlayerProgressBarPrimitive
      {...restProps}
      onChange={handleChange}
      ref={composedRef}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMove}
    />
  );
}
