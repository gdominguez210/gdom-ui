import type { ComponentPropsWithRef, ElementType } from 'react';
import clsx from 'clsx';
import { IconLibrary } from '@/lib/IconLibrary/IconLibrary';
import type { IconName } from '@/lib/IconLibrary/data';
import { Polymorphic } from '@/lib/Polymorphic/Polymorphic';
import { Button, type ButtonProps } from '@/lib/Button/Button';
import { twMerge } from 'tailwind-merge';

type CardRootProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
  as?: T;
};

function CardRoot<T extends ElementType = 'div'>(props: CardRootProps<T>) {
  const { as = 'div', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx(
        'sb-unstyled @container/card relative flex flex-col items-center gap-4 rounded-md border-[1px_1px_1px] border-[rgba(38,85,115,0.15)] bg-white p-[34px] shadow-[0px_1px_3px_0px_rgba(38,85,115,0.15)]',
        className,
      )}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

type CardHeaderProps<T extends ElementType = 'h2'> = ComponentPropsWithRef<T> & {
  as?: T;
};

function CardHeader<T extends ElementType = 'h2'>(props: CardHeaderProps<T>) {
  const { as = 'h2', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx('text-xl font-bold text-balance @min-[225px]/card:text-2xl', className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

type CardContentProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
  as?: T;
};

function CardContent<T extends ElementType = 'div'>(props: CardContentProps<T>) {
  const { as = 'div', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx(
        'min-w-0 flex-1 text-sm leading-6 text-balance text-gray-500 @min-[225px]/card:text-base @min-[225px]/card:leading-7',
        className,
      )}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

type CardIconProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
  as?: T;
  name: IconName;
};

function CardIcon<T extends ElementType = 'div'>(props: CardIconProps<T>) {
  const { as = 'div', name, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx(
        'inline-block rounded-full bg-blue-200 p-4 text-6xl text-white shadow-md shadow-blue-900/30 *:text-blue-700',
        className,
      )}
      {...rest}
    >
      <IconLibrary name={name} />
    </Polymorphic>
  );
}

function CardButton(props: ButtonProps) {
  const { className, ...restProps } = props;

  return (
    <Button
      className={twMerge(clsx('mt-auto', className))}
      {...restProps}
    />
  );
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent,
  Icon: CardIcon,
  Button: CardButton,
};
