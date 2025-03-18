import { type ComponentPropsWithRef, type ChangeEventHandler, useCallback, memo } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar/useAudioPlayerProgressBar';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';

export type AudioPlayerProgressBarProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

function AudioPlayerProgressBarPrimitive(props: AudioPlayerProgressBarProps) {
  const { className, ...restProps } = props;

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
      aria-label={'Audio progress'}
      role="slider"
      defaultValue="0"
      {...restProps}
      type="range"
    />
  );
}

const AudioPlayerProgressBarPrimitiveMemo = memo(AudioPlayerProgressBarPrimitive);
export { AudioPlayerProgressBarPrimitiveMemo as AudioPlayerProgressBarPrimitive };

function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps) {
  const { onChange, ...restProps } = props;
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

  return (
    <AudioPlayerProgressBarPrimitive
      {...restProps}
      onChange={handleChange}
      ref={progressBarRef}
    />
  );
}

const AudioPlayerProgressBarMemo = memo(AudioPlayerProgressBar);
AudioPlayerProgressBarMemo.displayName = 'AudioPlayerProgressBar';
export { AudioPlayerProgressBarMemo as AudioPlayerProgressBar };
