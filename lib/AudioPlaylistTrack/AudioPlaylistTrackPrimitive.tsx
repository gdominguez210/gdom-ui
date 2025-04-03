import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the audio playlist track primitive component
 */
export type AudioPlaylistTrackPrimitiveProps<T extends ElementType = 'li'> = {
  /** Element to render as @default li */
  as?: T;
  /** Whether the track is active */
  active?: boolean;
} & ComponentPropsWithRef<T>;

/**
 * Primitive component for rendering a single playlist track item
 */
export function AudioPlaylistTrackPrimitive<T extends ElementType = 'li'>(
  props: AudioPlaylistTrackPrimitiveProps<T>,
) {
  const { active, as: Element = 'li', children, className, ...restProps } = props;

  return (
    <Element
      tabIndex={0}
      role="button"
      aria-current={active ? 'true' : 'false'}
      className={twMerge(
        clsx(
          'flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors duration-200 focus-within:outline-white',
          {
            'bg-black/50': active,
            'hover:bg-black/30 focus-visible:bg-black/30': !active,
          },
          className,
        ),
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
}
