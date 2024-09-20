import { type HTMLAttributes, type ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerAuthorProps extends HTMLAttributes<HTMLElement> {
  /** @default p */
  as?: ElementType;
}

export function AudioPlayerAuthor(props: AudioPlayerAuthorProps) {
  const { as = 'p', className, ...restProps } = props;

  const { currentTrack: { author } = {} } = useAudioPlayerContext();

  if (!author) return null;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('text-sm text-gray-400 line-clamp-1', className))}
      title={author}
      {...restProps}
    >
      {author}
    </Node>
  );
}
