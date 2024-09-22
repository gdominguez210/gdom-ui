import { type ElementType, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerTitleProps extends HTMLAttributes<HTMLElement> {
  /** @default p */
  as?: ElementType;
}

export function AudioPlayerTitleBase(props: AudioPlayerTitleProps) {
  const { as = 'p', children, className, ...restProps } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('font-bold lg:truncate lg:max-w-64 line-clamp-1', className))}
      {...restProps}
    >
      {children}
    </Node>
  );
}

export function AudioPlayerTitle(props: AudioPlayerTitleProps) {
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
