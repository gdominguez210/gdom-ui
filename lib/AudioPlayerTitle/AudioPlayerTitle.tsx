import { type ElementType, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerTitleProps extends HTMLAttributes<HTMLElement> {
  /** @default p */
  as?: ElementType;
}

export function AudioPlayerTitle(props: AudioPlayerTitleProps) {
  const { as = 'p', className, ...restProps } = props;

  const { currentTrack: { title } = {} } = useAudioPlayerContext();

  if (!title) return null;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('font-bold lg:truncate lg:max-w-64 line-clamp-1', className))}
      title={title}
      {...restProps}
    >
      {title}
    </Node>
  );
}
