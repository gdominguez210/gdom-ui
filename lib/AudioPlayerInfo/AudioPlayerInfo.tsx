import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

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
