import { type HTMLAttributes, type ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';
import { formatAudioDurationForDisplay } from './data';

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
