import type { ComponentPropsWithRef, ElementType } from 'react';
import clsx from 'clsx';

/**
 * Props for the audio playlist primitive component
 */
export type AudioPlayerContainerProps<T extends ElementType = 'div'> = {
  /** Element to render as @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base wrapper component for the audio player UI
 */
export function AudioPlayerContainer<T extends ElementType>(props: AudioPlayerContainerProps<T>) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
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
    </Element>
  );
}
