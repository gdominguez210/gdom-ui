import { useRef, useCallback, useEffect, type ChangeEventHandler, type RefObject } from 'react';

interface UseAudioPlayerProgressBarProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  cssVariableName?: string;
  duration: number;
  isPlaying: boolean;
  onProgressChange: (time: number) => void;
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
  cssVariableName = '--range-progress',
  duration,
  isPlaying,
  onProgressChange,
  progressBarRef,
}: UseAudioPlayerProgressBarProps) {
  const animationRef = useRef<number | null>(null);

  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) return;

    const newTime = Number(progressBarRef.current.value);
    updateAudioCurrentTime(audioRef.current, newTime);
    onProgressChange(newTime);

    progressBarRef.current.style.setProperty(cssVariableName, `${(newTime / duration) * 100}%`);
  }, [audioRef, progressBarRef, duration, cssVariableName, onProgressChange]);

  const updateProgress = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;

    const currentTime = audioRef.current.currentTime;
    onProgressChange(currentTime);

    updateProgressBar(progressBarRef.current, currentTime);
    progressBarRef.current.style.setProperty(cssVariableName, `${(currentTime / duration) * 100}%`);
  }, [audioRef, progressBarRef, duration, cssVariableName, onProgressChange]);

  const startAnimation = useCallback(() => {
    if (audioRef?.current && progressBarRef?.current && duration) {
      const animate = () => {
        updateProgress();
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  }, [audioRef, progressBarRef, duration, updateProgress]);

  useEffect(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (isPlaying) {
      startAnimation();
      return;
    }

    updateProgress();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, duration, startAnimation, updateProgress]);

  return {
    handleProgressChange,
  };
}
