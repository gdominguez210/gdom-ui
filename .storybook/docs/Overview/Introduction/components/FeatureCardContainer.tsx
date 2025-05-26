import clsx from 'clsx';
import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
import type { ElementType } from 'react';

export type FeatureCardContainerProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

export function FeatureCardContainer<T extends ElementType = 'div'>(
  props: FeatureCardContainerProps<T>,
) {
  const { as = 'div', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={clsx('mt-[-74px] flex flex-1 flex-col items-center gap-4', className)}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
