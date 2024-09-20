import type { ElementType, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AudioPlayerInfoProps extends HTMLAttributes<HTMLElement> {
  /**
   * @default div
   * */
  as?: ElementType;
}

export function AudioPlayerInfo(props: AudioPlayerInfoProps) {
  const { as = 'div', className, children, ...restProps } = props;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('flex items-center gap-4', className))}
      {...restProps}
    >
      {children}
    </Node>
  );
}
