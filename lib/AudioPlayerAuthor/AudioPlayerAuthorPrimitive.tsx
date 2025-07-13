import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import type { ElementType } from 'react';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

/**
 * Props for the AudioPlayerAuthorPrimitive component
 */
export type AudioPlayerAuthorPrimitiveProps<T extends ElementType = 'span'> = PolymorphicProps<T>;

/**
 * Base component for displaying author information with appropriate styling
 */
export function AudioPlayerAuthorPrimitive<T extends ElementType = 'span'>(
  props: AudioPlayerAuthorPrimitiveProps<T>,
) {
  const { as = 'span', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={twMerge(clsx('line-clamp-1', 'text-sm', 'text-gray-400', className))}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
