import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';
import { useAudioPlayerTime } from '@lib/AudioPlayerTime/useAudioPlayerTime';

export type AudioPlayerTimeProps<T extends ElementType = 'div'> = {
  /** @default span */
  as?: T;
  currentTime: string;
  duration: string;
} & ComponentPropsWithoutRef<T>;

export function AudioPlayerTimeBase<T extends ElementType>(props: AudioPlayerTimeProps<T>) {
  const { as: Element = 'span', className, currentTime, duration, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('text-sm', className))}
      {...restProps}
    >
      {currentTime} / {duration}
    </Element>
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
