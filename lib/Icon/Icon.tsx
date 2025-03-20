import { type IconName, icons } from './data';
import clsx from 'clsx';
import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconProps extends ComponentPropsWithRef<'svg'> {
  name: IconName;
}

export function Icon(props: IconProps) {
  const { name, className, ...restProps } = props;

  const Icon = icons[name];

  return (
    <Icon
      className={twMerge(clsx('h-[1em] fill-current', className))}
      {...restProps}
    />
  );
}
