import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the track information container component
 */
export type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Container component for displaying track information (image, title, artist)
 */
export function AudioPlayerInfo<T extends ElementType>(props: AudioPlayerInfoProps<T>) {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center gap-4', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}
