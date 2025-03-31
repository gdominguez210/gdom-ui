import { type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Props for the audio player wrapper component
 */
export type AudioPlayerProps<T extends ElementType = 'div'> = {
  /** Element to render as
   * @default div
   * */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base wrapper component for the audio player UI
 */
export function AudioPlayer<T extends ElementType>(props: AudioPlayerProps<T>) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(
        clsx(
          'flex flex-col justify-center overflow-hidden rounded-md bg-slate-700 text-neutral-100',
        ),
        className,
      )}
      tabIndex={-1}
      {...restProps}
    >
      {children}
    </Element>
  );
}
