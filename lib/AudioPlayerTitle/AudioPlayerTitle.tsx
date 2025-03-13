import clsx from 'clsx';
import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

export type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
  /** @default p */
  as?: T;
} & ComponentPropsWithRef<T>;

export function AudioPlayerTitlePrimitive<T extends ElementType>(props: AudioPlayerTitleProps<T>) {
  const { as: Element = 'p', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('line-clamp-1 font-bold lg:max-w-64 lg:truncate', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export function AudioPlayerTitle<T extends ElementType = 'p'>(props: AudioPlayerTitleProps<T>) {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack();

  if (!title) return null;

  return (
    <AudioPlayerTitlePrimitive
      title={title}
      {...props}
    >
      {title}
    </AudioPlayerTitlePrimitive>
  );
}
