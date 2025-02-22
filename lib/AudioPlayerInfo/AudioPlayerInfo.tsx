import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

export type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
  /**
   * @default div
   * */
  as?: T;
} & ComponentPropsWithoutRef<T>;

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
