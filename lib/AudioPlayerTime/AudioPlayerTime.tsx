import { type HTMLAttributes, type ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { intervalToDuration } from 'date-fns';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

function formatAudioDurationForDisplay(audioDurationInSeconds: number = 0) {
  const {
    hours,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: 0,
    end: audioDurationInSeconds * 1000,
  });

  const formatWithZero = (num: number) => String(num).padStart(2, '0');

  return [hours, minutes, seconds].filter(isDefined).map(formatWithZero).join(':');
}

export interface AudioPlayerTimeProps extends HTMLAttributes<HTMLElement> {
  /** @default span */
  as?: ElementType;
}

export function AudioPlayerTime(props: AudioPlayerTimeProps) {
  const { as = 'span', className, ...restProps } = props;

  const { currentTime, duration } = useAudioPlayerContext();

  const currentTimeForDisplay = formatAudioDurationForDisplay(currentTime);
  const durationForDisplay = formatAudioDurationForDisplay(duration);

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('text-sm', className))}
      {...restProps}
    >
      {currentTimeForDisplay} / {durationForDisplay}
    </Node>
  );
}
