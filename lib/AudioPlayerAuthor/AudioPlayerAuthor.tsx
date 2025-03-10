import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextState';

export type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
  /** @default p */
  as?: T;
} & ComponentPropsWithRef<T>;

export function AudioPlayerAuthorBase<T extends ElementType>(props: AudioPlayerAuthorProps<T>) {
  const { as: Element = 'p', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('line-clamp-1 text-sm text-gray-400', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export function AudioPlayerAuthor<T extends ElementType>(props: AudioPlayerAuthorProps<T>) {
  const { currentTrack: { author } = {} } = useAudioPlayerContextState();

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
