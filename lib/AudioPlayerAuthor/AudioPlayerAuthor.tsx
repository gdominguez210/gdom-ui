import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';

export type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
  /** @default p */
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function AudioPlayerAuthorBase<T extends ElementType>(props: AudioPlayerAuthorProps<T>) {
  const { as: Element = 'p', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('line-clamp-1 text-sm text-gray-400', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export function AudioPlayerAuthor(props: AudioPlayerAuthorProps) {
  const { currentTrack: { author } = {} } = useAudioPlayerContext();

  if (!author) return null;

  return (
    <AudioPlayerAuthorBase
      {...props}
      title={author}
    >
      {author}
    </AudioPlayerAuthorBase>
  );
}
