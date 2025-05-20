import type { ComponentPropsWithRef, ComponentType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface IconProps extends ComponentPropsWithRef<'svg'> {
  as: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Icon(props: IconProps) {
  const { as: IconComponent, className, ...restProps } = props;

  return (
    <IconComponent
      className={twMerge(clsx('h-[1em] fill-current', className))}
      {...restProps}
    />
  );
}
