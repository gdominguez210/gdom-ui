import { useRef, useEffect, useCallback, type ChangeEventHandler } from 'react';
import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextState';
import { useAudioPlayerContextDispatch } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextDispatch';

export interface useAudioPlayerProgressBarProps {
  cssVariableName?: string;
}

export function useAudioPlayerProgressBar(props?: useAudioPlayerProgressBarProps) {
  const { cssVariableName = '--range-progress' } = props || {};

  const { isPlaying, progressBarRef, audioRef, duration, currentTrack } =
    useAudioPlayerContextState();

  const { dispatch, actions } = useAudioPlayerContextDispatch();

  const animationRef = useRef<number | null>(null);

  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      dispatch({ type: actions.SET_CURRENT_TIME, payload: { currentTime: newTime } });

      progressBarRef.current.style.setProperty(cssVariableName, `${(newTime / duration) * 100}%`);
    }
  }, [audioRef, progressBarRef, duration, cssVariableName, dispatch, actions]);

  const updateProgress = useCallback(() => {
    if (audioRef?.current && progressBarRef?.current && duration) {
      const currentTime = audioRef.current.currentTime;

      dispatch({ type: actions.SET_CURRENT_TIME, payload: { currentTime } });

      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        cssVariableName,
        `${(currentTime / duration) * 100}%`,
      );
    }
  }, [audioRef, progressBarRef, duration, cssVariableName, dispatch, actions]);

  const startAnimation = useCallback(() => {
    if (audioRef?.current && progressBarRef?.current && duration) {
      const animate = () => {
        updateProgress();
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  }, [audioRef, progressBarRef, animationRef, duration, updateProgress]);

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
