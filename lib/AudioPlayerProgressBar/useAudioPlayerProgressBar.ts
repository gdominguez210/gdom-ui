import { useRef, useCallback, useEffect, type ChangeEventHandler, type RefObject } from 'react';

interface UseAudioPlayerProgressBarProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTrack?: { src: string };
  cssVariableName?: string;
  duration: number;
  isPlaying: boolean;
  onProgressChange: (time: number) => void;
  progressBarRef: RefObject<HTMLInputElement | null>;
}

export function useAudioPlayerProgressBar({
  audioRef,
  currentTrack,
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
    audioRef.current.currentTime = newTime;
    onProgressChange(newTime);

    progressBarRef.current.style.setProperty(cssVariableName, `${(newTime / duration) * 100}%`);
  }, [audioRef, progressBarRef, duration, cssVariableName, onProgressChange]);

  const updateProgress = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;

    const currentTime = audioRef.current.currentTime;
    onProgressChange(currentTime);

    progressBarRef.current.value = currentTime.toString();
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
    if (isPlaying) {
      startAnimation();
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      updateProgress();
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, duration, currentTrack, startAnimation, updateProgress]);

  return {
    handleProgressChange,
  };
}
