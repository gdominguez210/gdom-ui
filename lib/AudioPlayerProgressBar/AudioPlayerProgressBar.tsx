import { forwardRef, type HTMLAttributes, type Ref } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';
import { useAudioPlayerProgressBar } from './useAudioPlayerProgressBar';

export interface AudioPlayerProgressBarProps extends HTMLAttributes<HTMLInputElement> {}

function _AudioPlayerProgressBarBase(
  props: AudioPlayerProgressBarProps,
  ref: Ref<HTMLInputElement>,
) {
  const { className } = props;

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
      {...props}
      ref={ref}
      type="range"
      defaultValue="0"
    />
  );
}

export const AudioPlayerProgressBarBase = forwardRef<HTMLInputElement, AudioPlayerProgressBarProps>(
  _AudioPlayerProgressBarBase,
);

export function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps) {
  const { progressBarRef } = useAudioPlayerContext();
  const { handleProgressChange } = useAudioPlayerProgressBar();

  return (
    <AudioPlayerProgressBarBase
      {...props}
      onChange={handleProgressChange}
      ref={progressBarRef}
    />
  );
}
