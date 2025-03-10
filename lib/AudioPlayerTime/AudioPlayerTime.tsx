import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextState';
import { useAudioPlayerTime } from '@lib/AudioPlayerTime/useAudioPlayerTime';

export type AudioPlayerTimeProps<T extends ElementType = 'span'> = {
  /** @default span */
  as?: T;
  currentTime: string;
  duration: string;
} & ComponentPropsWithRef<T>;

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
  const { currentTime, duration } = useAudioPlayerContextState();
  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({ currentTime, duration });

  return (
    <AudioPlayerTimeBase
      {...props}
      currentTime={currentTimeDisplay}
      duration={durationDisplay}
    />
  );
}
