import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@/lib/Icon/Icon';
import { type IconName, icons } from '@/lib/IconLibrary/data';

export interface IconLibraryProps extends ComponentPropsWithRef<'svg'> {
  name: IconName;
}

export function IconLibrary(props: IconLibraryProps) {
  const { name, className, ...restProps } = props;

  const IconComponent = icons[name];

  if (!IconComponent) {
    console.error(`IconLibrary: Icon with name "${name}" not found`);
    return null;
  }

  return (
    <Icon
      as={IconComponent}
      className={twMerge(clsx('h-[1em] fill-current', className))}
      {...restProps}
    />
  );
}
