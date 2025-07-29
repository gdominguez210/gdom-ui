import { cn } from '@/utils/cn';
import type { ComponentPropsWithRef } from 'react';

export function DocBlockContainer(props: ComponentPropsWithRef<'div'>) {
  const { children, className, ...restProps } = props;

  return (
    <div
      className={cn('sb-unstyled flex flex-col gap-12', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}
