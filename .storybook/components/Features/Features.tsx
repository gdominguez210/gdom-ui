import { IconLibrary, type IconLibraryProps } from '@/lib/IconLibrary/IconLibrary';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';
export type Feature = {
  header: string;
  description: string | ReactNode;
  icon: string;
  href?: string;
};

function FeaturesRoot<T extends ElementType = 'section'>(props: PolymorphicProps<T>) {
  const { as = 'section', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={cn('flex flex-col gap-4', className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

export type FeaturesHeaderProps<T extends ElementType = 'h2'> = PolymorphicProps<T>;

function FeaturesHeader(props: FeaturesHeaderProps) {
  const { as = 'h2', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={cn('text-lg/normal font-medium', className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

export type FeaturesListProps<T extends ElementType = 'ul'> = PolymorphicProps<T>;

function FeaturesList(props: FeaturesListProps) {
  const { as = 'ul', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={cn('sb-unstyled font-[Nunito_Sans]flex flex-col gap-4', className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

export type FeaturesItemProps<T extends ElementType = 'li'> = PolymorphicProps<T>;

function FeaturesItem(props: FeaturesItemProps) {
  const { as: Element = 'li', children, className, ...rest } = props;

  return (
    <Element
      className={cn('flex flex-col gap-3', className)}
      {...rest}
    >
      {children}
    </Element>
  );
}

export type FeaturesItemHeaderProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

function FeaturesItemHeader(props: FeaturesItemHeaderProps) {
  const { as = 'div', children, className, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={cn('flex items-center gap-2 font-bold', as === 'a' && 'text-[#029cfd]', className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
}

export type FeaturesIconProps<T extends ElementType = 'span'> = IconLibraryProps &
  PolymorphicProps<T>;

function FeaturesIcon<T extends ElementType = 'span'>(props: FeaturesIconProps<T>) {
  const { as = 'span', className, name, ...rest } = props;

  return (
    <Polymorphic
      as={as}
      className={cn(
        'sb-unstyled rounded-full bg-blue-200 p-[.3em] text-2xl text-blue-700',
        className,
      )}
      {...rest}
    >
      <IconLibrary name={name} />
    </Polymorphic>
  );
}

export const Features = {
  Root: Object.assign(FeaturesRoot, { displayName: 'Features.Root' }),
  Header: Object.assign(FeaturesHeader, { displayName: 'Features.Header' }),
  List: Object.assign(FeaturesList, { displayName: 'Features.List' }),
  Item: Object.assign(FeaturesItem, { displayName: 'Features.Item' }),
  ItemHeader: Object.assign(FeaturesItemHeader, { displayName: 'Features.ItemHeader' }),
  Icon: Object.assign(FeaturesIcon, { displayName: 'Features.Icon' }),
};
