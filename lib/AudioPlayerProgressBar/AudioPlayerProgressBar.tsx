'use client';

import {
  type ChangeEventHandler,
  type ComponentPropsWithRef,
  type RefObject,
  useCallback,
} from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/useAudioPlayerProgressBar';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useComposedRefs } from '@lib/useComposedRefs';
import { AudioPlayerProgressBarPrimitive } from './AudioPlayerProgressBarPrimitive';
import {
  useKeyboardMediaSeek,
  type UseKeyboardMediaSeekOptions,
} from '@lib/useKeyboardMediaSeek/useKeyboardMediaSeek';
/**
 * Props for the progress bar component
 */
export type AudioPlayerProgressBarProps = Omit<ComponentPropsWithRef<'input'>, 'type'> &
  Omit<UseKeyboardMediaSeekOptions, 'mediaRef'>;

/**
 * Progress bar that integrates with the audio player context for playback control
 */
export function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps) {
  const { onChange, ref, seekIncrement, maxSeekIncrement, ...restProps } = props;
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

  const { handleKeyDown, handleKeyUp } = useKeyboardMediaSeek({
    mediaRef: audioRef as RefObject<HTMLAudioElement>,
    duration,
    onSeekComplete: seek,
    seekIncrement,
    maxSeekIncrement,
  });

  const composedRef = useComposedRefs(progressBarRef, ref, elementRef);

  return (
    <AudioPlayerProgressBarPrimitive
      {...restProps}
      onChange={handleChange}
      ref={composedRef}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    />
  );
}
