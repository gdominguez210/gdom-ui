import { Button } from '@/lib/Button/Button';
import { cn } from '@/utils/cn';
import type { ComponentPropsWithRef } from 'react';

interface DocumentationNavItemProps extends ComponentPropsWithRef<'a'> {
  active?: boolean;
}

export function DocumentationNavItem({
  active,
  className,
  children,
  ...props
}: DocumentationNavItemProps) {
  return (
    <Button
      variant="tertiary"
      as="a"
      className={cn(
        'justify-start',
        'border-l-4',
        'rounded-none',
        'border-l-transparent',
        'truncate',
        'overflow-hidden',
        'text-ellipsis',
        'block',
        'whitespace-nowrap',
        {
          'border-l-blue-500 font-bold': active,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
