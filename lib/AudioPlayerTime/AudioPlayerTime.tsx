import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerTime } from './useAudioPlayerTime';

/**
 * Props for the time display primitive component
 */
export type AudioPlayerTimePrimitiveProps<T extends ElementType = 'span'> = {
  /** Element to render as @default span */
  as?: T;
  /** Current playback time formatted as a string */
  currentTime?: string;
  /** Total duration formatted as a string */
  duration?: string;
  /** Separator between current time and duration @default /  */
  separator?: string;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying formatted audio playback time
 */
export function AudioPlayerTimePrimitive<T extends ElementType>(
  props: AudioPlayerTimePrimitiveProps<T>,
) {
  const {
    as: Element = 'span',
    className,
    currentTime,
    duration,
    separator = ' / ',
    ...restProps
  } = props;

  return (
    <Element
      className={twMerge(
        clsx('inline-block font-mono text-sm tabular-nums', 'min-w-[6ch]', 'text-right', className),
      )}
      {...restProps}
    >
      {`${currentTime}${separator}${duration}`}
    </Element>
  );
}

/**
 * Props for the time display component (current time and duration from context)
 */
export type AudioPlayerTimeProps = Omit<AudioPlayerTimePrimitiveProps, 'currentTime' | 'duration'>;

/**
 * Displays the current playback time and total duration from context
 */
export function AudioPlayerTime(props: AudioPlayerTimeProps) {
  const { currentTime, duration } = useAudioPlayerContextTime();

  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({ currentTime, duration });

  return (
    <AudioPlayerTimePrimitive
      {...props}
      currentTime={currentTimeDisplay}
      duration={durationDisplay}
    />
  );
}
