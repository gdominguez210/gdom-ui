import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

export type AudioPlayerTitlePrimitiveProps<T extends ElementType = 'span'> = PolymorphicProps<T>;

/**
 * Base component for displaying track title with appropriate styling
 */
export function AudioPlayerTitlePrimitive<T extends ElementType = 'span'>(
  props: AudioPlayerTitlePrimitiveProps<T>,
) {
  const { as = 'span', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx('line-clamp-1', 'font-bold', 'lg:max-w-64', 'lg:truncate', className)}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
