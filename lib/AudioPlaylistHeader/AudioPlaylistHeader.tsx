import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the audio playlist header component
 */
export type AudioPlaylistHeaderProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Header component for playlist with consistent styling
 */
export function AudioPlaylistHeader<T extends ElementType = 'div'>(
  props: AudioPlaylistHeaderProps<T>,
) {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'flex items-center justify-between border-b border-slate-700 p-4 text-lg font-medium',
          className,
        ),
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
}
