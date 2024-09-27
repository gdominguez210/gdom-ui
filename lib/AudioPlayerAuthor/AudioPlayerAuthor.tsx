import { type HTMLAttributes, type ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';

export interface AudioPlayerAuthorProps extends HTMLAttributes<HTMLElement> {
  /** @default p */
  as?: ElementType;
}

export function AudioPlayerAuthorBase(props: AudioPlayerAuthorProps) {
  const { as = 'p', className, children, ...restProps } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('line-clamp-1 text-sm text-gray-400', className))}
      {...restProps}
    >
      {children}
    </Node>
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
