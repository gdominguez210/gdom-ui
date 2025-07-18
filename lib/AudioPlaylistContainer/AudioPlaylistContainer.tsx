import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

/**
 * Props for the audio playlist primitive component
 */
export type AudioPlaylistContainerProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

/**
 * Base component for displaying a playlist of audio tracks, providing the essential markup
 */
export function AudioPlaylistContainer<T extends ElementType = 'div'>(
  props: AudioPlaylistContainerProps<T>,
) {
  const { as = 'div', className, children, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx('flex flex-col border-slate-600 bg-slate-800 text-neutral-100', className)}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
