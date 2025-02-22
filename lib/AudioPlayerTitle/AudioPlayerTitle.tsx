import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';

export type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
  /** @default p */
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function AudioPlayerTitleBase<T extends ElementType>(props: AudioPlayerTitleProps<T>) {
  const { as: Element = 'p', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('font-bold lg:truncate lg:max-w-64 line-clamp-1', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export function AudioPlayerTitle<T extends ElementType>(props: AudioPlayerTitleProps<T>) {
  const { currentTrack: { title } = {} } = useAudioPlayerContext();

  if (!title) return null;

  return (
    <AudioPlayerTitleBase
      title={title}
      {...props}
    >
      {title}
    </AudioPlayerTitleBase>
  );
}
