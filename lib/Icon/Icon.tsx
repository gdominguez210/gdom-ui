import type { ComponentPropsWithRef, ComponentType } from 'react';
import { cn } from '@/utils/cn';

export interface IconProps extends ComponentPropsWithRef<'svg'> {
  as: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Icon(props: IconProps) {
  const { as: IconComponent, className, ...restProps } = props;

  return (
    <IconComponent
      className={cn('h-[1em] fill-current', className)}
      {...restProps}
    />
  );
}
