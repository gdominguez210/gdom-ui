import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
import type { ElementType } from 'react';
import clsx from 'clsx';

export type MissionStatementProps<T extends ElementType> = PolymorphicProps<T>;

export function MissionStatement<T extends ElementType>(props: MissionStatementProps<T>) {
  const { children, className, as = 'section', ...rest } = props;
  return (
    <Polymorphic
      as={as}
      className={clsx(
        'relative',
        'p-12',
        'before:absolute',
        'before:top-0',
        'before:left-1/2',
        'before:w-screen',
        'before:h-full',
        'before:-z-10',
        "before:content-['']",
        'before:bg-blue-50',
        // 'before:bg-gradient-to-b',
        // 'before:via-blue-100',
        // 'before:via-[80%]',
        // 'before:to-white',
        // 'before:to-[90%]',
        'before:transform',
        'before:-translate-x-1/2',
        // 'dark:before:from-blue-950',
        // 'dark:before:to-blue-900',
        className,
      )}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}
