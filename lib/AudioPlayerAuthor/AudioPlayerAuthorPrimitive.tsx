import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the AudioPlayerAuthorPrimitive component
 */
export type AudioPlayerAuthorPrimitiveProps = PolymorphicProps<'span'>;

/**
 * Base component for displaying author information with appropriate styling
 */
const _AudioPlayerAuthorPrimitive = (props: PolymorphicProps<'span'>) => {
  const { as: Element = 'span', children, className, ...restProps } = props;

  return (
    <Element
      className={cn('line-clamp-1', 'text-sm', 'text-gray-400', className)}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerAuthorPrimitive.displayName = 'AudioPlayerAuthorPrimitive';

export const AudioPlayerAuthorPrimitive =
  _AudioPlayerAuthorPrimitive as PolymorphicComponent<'span'>;
