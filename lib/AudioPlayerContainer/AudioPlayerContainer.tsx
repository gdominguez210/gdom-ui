import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

/**
 * Props for the audio playlist primitive component
 */
export type AudioPlayerContainerProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

/**
 * Base wrapper component for the audio player UI
 */
export function AudioPlayerContainer<T extends ElementType = 'div'>(
  props: AudioPlayerContainerProps<T>,
) {
  const { as = 'div', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx(
        'flex',
        'flex-col',
        'justify-center',
        'overflow-hidden',
        'rounded-md',
        'bg-slate-700',
        'text-neutral-100',
        className,
      )}
      tabIndex={-1}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
