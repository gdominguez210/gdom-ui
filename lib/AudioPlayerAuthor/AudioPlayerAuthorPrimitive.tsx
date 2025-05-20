import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import type { ElementType } from 'react';
import type { AudioPlayerAuthorProps } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthor';

/**
 * Props for the AudioPlayerAuthorPrimitive component
 */
export type AudioPlayerAuthorPrimitiveProps<T extends ElementType = 'p'> =
  AudioPlayerAuthorProps<T>;

/**
 * Base component for displaying author information with appropriate styling
 */
export function AudioPlayerAuthorPrimitive<T extends ElementType = 'p'>(
  props: AudioPlayerAuthorPrimitiveProps<T>,
) {
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
