import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
/**
 * Props for the playback controls container
 */
export type AudioPlayerControlsProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

/**
 * Base component for laying out audio player controls
 */
export function AudioPlayerControls<T extends ElementType = 'div'>(
  props: AudioPlayerControlsProps<T>,
) {
  const { as = 'div', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'gap-1',
        'p-4',
        'text-2xl',
        className,
      )}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
