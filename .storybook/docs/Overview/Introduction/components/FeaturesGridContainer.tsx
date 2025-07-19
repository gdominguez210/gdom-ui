import { Polymorphic, type PolymorphicProps } from '@/lib/Polymorphic/Polymorphic';
import type { ElementType } from 'react';
import { cn } from '@/utils/cn';
export type FeaturesGridContainerProps<T extends ElementType = 'section'> = PolymorphicProps<T>;

export function FeaturesGridContainer<T extends ElementType = 'section'>(
  props: FeaturesGridContainerProps<T>,
) {
  const { as = 'section', children, className, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={cn(
        'grid grid-cols-1 gap-x-10 gap-y-14 text-center @min-[480px]:auto-rows-fr @min-[480px]:grid-cols-2 @min-[480px]:text-left @min-[976px]:grid-cols-3',
        className,
      )}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}
