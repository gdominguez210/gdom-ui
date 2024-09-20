import {
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ChangeEventHandler,
} from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerProgressBarProps extends HTMLAttributes<HTMLInputElement> {}

export function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps) {
  const { className, ...restProps } = props;

  const { isPlaying, progressBarRef, audioRef, setCurrentTime, duration, currentTrack } =
    useAudioPlayerContext();

  const animationRef = useRef<number | null>(null);

  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);

      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(newTime / duration) * 100}%`,
      );
    }
  }, [audioRef, progressBarRef, setCurrentTime, duration]);

  const updateProgress = useCallback(() => {
    if (audioRef?.current && progressBarRef?.current && duration) {
      const currentTime = audioRef.current.currentTime;

      setCurrentTime(currentTime);

      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`,
      );
    }
  }, [audioRef, progressBarRef, setCurrentTime, duration]);

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

  return (
    <input
      className={twMerge(
        clsx(
          '[--range-progress:0%]',
          'appearance-none',
          'bg-gray-500',
          'relative',
          'w-full',
          'h-2',
          'cursor-pointer',
          'before:block',
          'before:w-[--range-progress]',
          'before:bg-neutral-100',
          `before:content-['']`,
          'before:absolute',
          'before:top-0',
          'before:left-0',
          'before:h-2',
          'active:[&::-webkit-slider-thumb]:bg-neutral-100',
          'active:[&::-webkit-slider-thumb]:scale-125',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:h-2',
          '[&::-webkit-slider-thumb]:w-2',
          '[&::-webkit-slider-thumb]:border-none',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:position-relative',
          className,
        ),
      )}
      {...restProps}
      ref={progressBarRef}
      type="range"
      defaultValue="0"
      onChange={handleProgressChange}
    />
  );
}
