import type { ElementType } from 'react';
import type { AudioPlayerTitleProps } from '@/lib/AudioPlayerTitle/AudioPlayerTitle';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export type AudioPlayerTitlePrimitiveProps<T extends ElementType = 'p'> = AudioPlayerTitleProps<T>;

/**
 * Base component for displaying track title with appropriate styling
 */
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
