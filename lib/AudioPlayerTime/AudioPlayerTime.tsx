import { type ComponentPropsWithRef, type ElementType, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import { useAudioPlayerTime } from './useAudioPlayerTime';

export type AudioPlayerTimePrimitiveProps<T extends ElementType = 'span'> = {
  /** @default span */
  as?: T;
  currentTime?: string;
  duration?: string;
  separator?: string;
} & ComponentPropsWithRef<T>;

function AudioPlayerTimePrimitive<T extends ElementType>(props: AudioPlayerTimePrimitiveProps<T>) {
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
      className={twMerge(clsx('text-sm', className))}
      {...restProps}
    >
      {`${currentTime}${separator}${duration}`}
    </Element>
  );
}

const AudioPlayerTimePrimitiveMemo = memo(AudioPlayerTimePrimitive);
AudioPlayerTimePrimitiveMemo.displayName = 'AudioPlayerTimePrimitive';
export { AudioPlayerTimePrimitiveMemo as AudioPlayerTimePrimitive };

export type AudioPlayerTimeProps = Omit<AudioPlayerTimePrimitiveProps, 'currentTime' | 'duration'>;

function AudioPlayerTime(props: AudioPlayerTimeProps) {
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

const AudioPlayerTimeMemo = memo(AudioPlayerTime);
AudioPlayerTimeMemo.displayName = 'AudioPlayerTime';
export { AudioPlayerTimeMemo as AudioPlayerTime };
