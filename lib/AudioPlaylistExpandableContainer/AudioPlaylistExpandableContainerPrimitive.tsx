import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
import type { ElementType } from 'react';

type AudioPlaylistExpandableContainerPrimitivePropsInternal = {
  isExpanded?: boolean;
};

/**
 * Props for the expandable container primitive component
 */
export type AudioPlaylistExpandableContainerPrimitiveProps<T extends ElementType = 'div'> =
  PolymorphicProps<T, AudioPlaylistExpandableContainerPrimitivePropsInternal>;

/**
 * Primitive container component that can expand/collapse its content
 * This component is purely presentational and can be server-rendered
 */
const _AudioPlaylistExpandableContainerPrimitive = (
  props: PolymorphicProps<'div', AudioPlaylistExpandableContainerPrimitivePropsInternal>,
) => {
  const { as: Element = 'div', isExpanded, children, className, ...restProps } = props;

  return (
    <Element
      className={cn(
        'relative',
        'overflow-hidden',
        'transition-all',
        'duration-300',
        {
          'max-h-[300px] opacity-100': isExpanded,
          'pointer-events-none max-h-0 opacity-0': !isExpanded,
        },
        className,
      )}
      aria-hidden={!isExpanded}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistExpandableContainerPrimitive.displayName =
  'AudioPlaylistExpandableContainerPrimitive';

export const AudioPlaylistExpandableContainerPrimitive =
  _AudioPlaylistExpandableContainerPrimitive as PolymorphicComponent<
    'div',
    AudioPlaylistExpandableContainerPrimitivePropsInternal
  >;
