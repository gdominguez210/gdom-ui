import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the audio playlist tracks primitive component
 */
export type AudioPlaylistTracksPrimitiveProps<T extends ElementType = 'ul'> = {
  /** Element to render as @default ul */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Primitive component for rendering the scrollable list of playlist tracks
 */
export function AudioPlaylistTracksPrimitive<T extends ElementType = 'ul'>(
  props: AudioPlaylistTracksPrimitiveProps<T>,
) {
  const { as: Element = 'ul', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex flex-col gap-2 p-4', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}
