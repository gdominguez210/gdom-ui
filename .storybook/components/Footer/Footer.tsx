import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

export type FooterProps = ComponentPropsWithRef<'footer'>;

export function Footer(props: FooterProps) {
  const { className, children, ...rest } = props;

  return (
    <footer
      className={cn('@container/footer border-t border-gray-200', className)}
      {...rest}
    >
      <div className="flex flex-col justify-between gap-4 p-4 @min-[400px]/footer:flex-row @min-[400px]/footer:items-center">
        {children}
      </div>
    </footer>
  );
}
