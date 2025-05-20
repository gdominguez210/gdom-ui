import type { AudioPlayerProgressBarProps } from '@/lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the progress bar component
 */
export type AudioPlayerProgressBarPrimitiveProps = AudioPlayerProgressBarProps & {
  previewPercentage?: number;
};

/**
 * Base component for displaying and styling the audio progress bar
 */
export function AudioPlayerProgressBarPrimitive(props: AudioPlayerProgressBarPrimitiveProps) {
  const { className, previewPercentage, ...restProps } = props;

  return (
    <input
      className={twMerge(
        clsx(
          // Base styles
          '[--range-progress:0%]',
          '[--range-preview:0%]',
          'appearance-none',
          'bg-gray-500',
          'relative',
          'w-full',
          'h-2',
          'cursor-pointer',
          'focus-within:outline-white',
          // Progress bar styles
          'before:block',
          'before:w-(--range-progress)',
          'before:bg-neutral-100',
          `before:content-['']`,
          'before:absolute',
          'before:top-0',
          'before:left-0',
          'before:h-2',
          'before:z-[1]',
          // Preview styles
          'after:block',
          'after:transition-opacity',
          'after:delay-150',
          'after:duration-300',
          'after:ease-in-out',
          'after:w-(--range-preview)',
          'after:opacity-0',
          'after:bg-neutral-400',
          'after:content-[""]',
          'after:absolute',
          'after:top-0',
          'after:left-0',
          'after:h-2',
          'after:z-[0]',
          'hover:after:opacity-100',
          // WebKit (Chrome, Safari, newer Edge) track styles
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
      aria-label={'Audio progress'}
      role="slider"
      defaultValue="0"
      {...restProps}
      type="range"
      style={
        {
          '--range-progress': `${restProps.value ?? 0}%`,
          '--range-preview': `${previewPercentage ?? 0}%`,
        } as React.CSSProperties
      }
    />
  );
}
