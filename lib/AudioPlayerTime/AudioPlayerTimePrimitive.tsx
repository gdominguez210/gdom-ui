import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
/**
 * Props for the time display primitive component
 */
export type AudioPlayerTimePrimitiveProps<T extends ElementType = 'span'> = PolymorphicProps<T>;

/**
 * Base component for displaying formatted audio playback time
 */
export function AudioPlayerTimePrimitive<T extends ElementType = 'span'>(
  props: AudioPlayerTimePrimitiveProps<T>,
) {
  const { as = 'span', className, children, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx(
        'line-clamp-1',
        'inline-block',
        'min-w-[6ch]',
        'truncate',
        'font-mono',
        'text-sm',
        'tabular-nums',
        className,
      )}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
