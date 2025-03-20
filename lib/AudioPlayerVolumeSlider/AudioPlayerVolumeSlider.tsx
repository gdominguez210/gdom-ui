import { useCallback, type ChangeEventHandler, type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';

export type AudioPlayerVolumeSliderProps = Omit<AudioPlayerVolumeSliderPrimitiveProps, 'value'>;
/**
 * Volume slider that integrates with the audio player context
 */
export function AudioPlayerVolumeSlider(props: AudioPlayerVolumeSliderProps) {
  const { onChange, ...restProps } = props;
  const { volume, setVolume } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      onChange?.(e);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
      }
    },
    [onChange, setVolume, audioRef],
  );

  return (
    <AudioPlayerVolumeSliderPrimitive
      {...restProps}
      value={volume}
      onChange={handleVolumeChange}
    />
  );
}

/**
 * Props for the volume slider primitive component
 */
export type AudioPlayerVolumeSliderPrimitiveProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  /** Current volume value */
  value: number;
  /** Minimum volume value @default 0 */
  min?: number;
  /** Maximum volume value @default 100 */
  max?: number;
  /** Orientation of the slider @default horizontal */
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Base input range component for volume control
 */
export function AudioPlayerVolumeSliderPrimitive(props: AudioPlayerVolumeSliderPrimitiveProps) {
  const { className, min = 0, max = 100, value, orientation = 'horizontal', ...restProps } = props;

  return (
    <input
      className={twMerge(
        clsx(
          '[--volume-value:0%]',
          'appearance-none',
          'bg-gray-500',
          'relative',
          'cursor-pointer',
          orientation === 'horizontal'
            ? ['w-full', 'h-2']
            : ['[writing-mode:bt-lr]', '[appearance:slider-vertical]', 'h-32', 'w-2'],
          // Progress bar styles
          'before:block',
          'before:w-[--volume-value]',
          'before:bg-neutral-100',
          `before:content-['']`,
          'before:absolute',
          'before:top-0',
          'before:left-0',
          'before:h-full',
          // WebKit track styles
          '[&::-webkit-slider-runnable-track]:bg-transparent',
          '[&::-webkit-slider-runnable-track]:appearance-none',
          '[&::-webkit-slider-runnable-track]:shadow-none',
          '[&::-webkit-slider-runnable-track]:border-transparent',
          // WebKit thumb (hidden)
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-0',
          '[&::-webkit-slider-thumb]:h-0',
          '[&::-webkit-slider-thumb]:border-none',
          // Firefox track styles
          '[&::-moz-range-track]:bg-transparent',
          '[&::-moz-range-track]:appearance-none',
          '[&::-moz-range-track]:border-none',
          '[&::-moz-range-progress]:appearance-none',
          '[&::-moz-range-progress]:bg-neutral-100',
          '[&::-moz-range-progress]:h-2',
          // Firefox thumb (hidden)
          '[&::-moz-range-thumb]:appearance-none',
          '[&::-moz-range-thumb]:w-0',
          '[&::-moz-range-thumb]:h-0',
          '[&::-moz-range-thumb]:border-none',
          // IE/Edge track styles
          '[&::-ms-track]:bg-transparent',
          '[&::-ms-track]:appearance-none',
          '[&::-ms-track]:border-none',
          '[&::-ms-fill-lower]:bg-neutral-100',
          '[&::-ms-fill-upper]:bg-gray-500',
          // IE/Edge thumb (hidden)
          '[&::-ms-thumb]:appearance-none',
          '[&::-ms-thumb]:w-0',
          '[&::-ms-thumb]:h-0',
          '[&::-ms-thumb]:border-none',
          className,
        ),
      )}
      type="range"
      min={min}
      max={max}
      value={value}
      aria-label="Volume Control"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`Volume ${value}%`}
      aria-orientation={orientation}
      style={{ '--volume-value': `${value}%` } as React.CSSProperties}
      {...restProps}
    />
  );
}
