import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';

/**
 * Props for the track information container component
 */
export type AudioPlayerInfoProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

/**
 * Container component for displaying track information (image, title, artist)
 */
export function AudioPlayerInfo<T extends ElementType = 'div'>(props: AudioPlayerInfoProps<T>) {
  const { as = 'div', className, children, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx('flex', 'items-center', 'gap-4', className)}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
