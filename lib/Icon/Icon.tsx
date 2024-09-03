import { type IconName, icons } from './data';
import clsx from 'clsx';
import { type SVGAttributes, type Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconProps extends SVGAttributes<SVGElement> {
  name: IconName;
}

function _Icon(props: IconProps, ref: Ref<SVGSVGElement>) {
  const { name, className, ...restProps } = props;

  const Icon = icons[name];

  return (
    <Icon
      className={twMerge(clsx('h-[1em] fill-current', className))}
      {...restProps}
      ref={ref}
    />
  );
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(_Icon);
