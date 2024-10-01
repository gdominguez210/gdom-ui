import clsx from 'clsx';
import { type ElementType, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';
import { useAudioPlayerTime } from '@lib/AudioPlayerTime/useAudioPlayerTime';

export interface AudioPlayerTimeProps extends HTMLAttributes<HTMLElement> {
  /** @default span */
  as?: ElementType;
  currentTime: string;
  duration: string;
}

export function AudioPlayerTimeBase(props: AudioPlayerTimeProps) {
  const { as = 'span', className, currentTime, duration, ...restProps } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('text-sm', className))}
      {...restProps}
    >
      {currentTime} / {duration}
    </Node>
  );
}

export function AudioPlayerTime(props: Omit<AudioPlayerTimeProps, 'currentTime' | 'duration'>) {
  const { currentTime, duration } = useAudioPlayerContext();

  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({ currentTime, duration });

  return (
    <AudioPlayerTimeBase
      {...props}
      currentTime={currentTimeDisplay}
      duration={durationDisplay}
    />
  );
}
