import type { ElementType } from 'react';
import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
/**
 * Props for the audio playlist track primitive component
 */
export type AudioPlaylistTrackContainerPrimitiveProps<T extends ElementType = 'li'> =
  PolymorphicProps<T>;

/**
 * Primitive component for rendering a single playlist track item
 */
export function AudioPlaylistTrackContainerPrimitive<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackContainerPrimitiveProps<T>,
) {
  const { active, as = 'li', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      tabIndex={0}
      role="button"
      aria-current={active ? 'true' : 'false'}
      className={clsx(
        'flex',
        'cursor-pointer',
        'items-center',
        'gap-3',
        'rounded-md',
        'p-2',
        'transition-colors',
        'duration-200',
        'focus-within:outline-white',
        {
          'bg-black/50': active,
          'hover:bg-black/30': !active,
          'focus-visible:bg-black/30': !active,
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
