import {
  useCallback,
  useEffect,
  type ChangeEventHandler,
  type MouseEventHandler,
  type RefObject,
} from 'react';
import { useAnimationFrame } from '@lib/useAnimationFrame/useAnimationFrame';
import { useElementDimensions } from '@lib/useElementDimensions/useElementDimensions';
import { useDelayedMouseMove } from '@lib/useDelayedMouseMove/useDelayedMouseMove';
interface UseAudioPlayerProgressBarProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  progressCssVariableName?: string;
  previewCssVariableName?: string;
  duration: number;
  isPlaying: boolean;
  onProgressChange: (time: number) => void;
  onPreviewTimeChange?: (time: number | null) => void;
  progressBarRef: RefObject<HTMLInputElement | null>;
}

/**
 * Updates an HTML input range element's value
 * This helper function avoids direct mutation of refs in component callbacks
 */
function updateProgressBar(progressBar: HTMLInputElement | null, value: number): void {
  if (!progressBar) return;
  progressBar.value = value.toString();
}

/**
 * Updates an HTML audio element's current time
 * This helper function avoids direct mutation of refs in component callbacks
 */
function updateAudioCurrentTime(audio: HTMLAudioElement | null, time: number): void {
  if (!audio) return;
  audio.currentTime = time;
}

/**
 * Custom hook for managing audio player progress bar
 * Handles progress bar value updates and animation
 */
export function useAudioPlayerProgressBar({
  audioRef,
  progressCssVariableName = '--range-progress',
  previewCssVariableName = '--range-preview',
  duration,
  isPlaying,
  onProgressChange,
  onPreviewTimeChange,
  progressBarRef,
}: UseAudioPlayerProgressBarProps) {
  const { dimensionsRef, elementRef } = useElementDimensions();

  const _handleMouseMove: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!progressBarRef.current) return;

      const { width, left } = dimensionsRef.current;
      if (width === 0) return;

      const mouseX = e.clientX - left;
      const position = mouseX / width;

      const previewTime = position * duration;

      progressBarRef.current.style.setProperty(
        previewCssVariableName,
        `${(previewTime / duration) * 100}%`,
      );

      onPreviewTimeChange?.(previewTime);
    },
    [progressBarRef, previewCssVariableName, duration, onPreviewTimeChange, dimensionsRef],
  );

  const _handleMouseOut: MouseEventHandler<HTMLInputElement> = useCallback(() => {
    if (!progressBarRef.current) return;

    progressBarRef.current.style.setProperty(previewCssVariableName, '0%');
    onPreviewTimeChange?.(null);
  }, [progressBarRef, previewCssVariableName, onPreviewTimeChange]);

  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) return;

    const newTime = Number(progressBarRef.current.value);
    updateAudioCurrentTime(audioRef.current, newTime);
    onProgressChange(newTime);

    progressBarRef.current.style.setProperty(
      progressCssVariableName,
      `${(newTime / duration) * 100}%`,
    );
  }, [audioRef, progressBarRef, duration, progressCssVariableName, onProgressChange]);

  const updateProgress = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;

    const currentTime = audioRef.current.currentTime;
    onProgressChange(currentTime);

    updateProgressBar(progressBarRef.current, currentTime);
    progressBarRef.current.style.setProperty(
      progressCssVariableName,
      `${(currentTime / duration) * 100}%`,
    );
  }, [audioRef, progressBarRef, duration, progressCssVariableName, onProgressChange]);

  useAnimationFrame({
    isActive: isPlaying,
    callback: updateProgress,
    dependencies: [duration],
  });

  const { handleMouseEnter, handleMouseMove, handleMouseOut } =
    useDelayedMouseMove<HTMLInputElement>({
      onMouseMove: _handleMouseMove,
      onMouseLeave: _handleMouseOut,
    });

  useEffect(() => {
    if (!isPlaying) {
      updateProgress();
    }
  }, [isPlaying, updateProgress]);

  return {
    handleProgressChange,
    handleMouseEnter,
    handleMouseMove,
    handleMouseOut,
    elementRef,
  };
}
