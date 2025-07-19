import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

export type AudioPlayerTitlePrimitiveProps = PolymorphicProps<'span'>;

/**
 * Base component for displaying track title with appropriate styling
 */
const _AudioPlayerTitlePrimitive = (props: AudioPlayerTitlePrimitiveProps) => {
  const { as: Element = 'span', children, className, ...restProps } = props;

  return (
    <Element
      className={cn('line-clamp-1', 'font-bold', 'lg:max-w-64', 'lg:truncate', className)}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerTitlePrimitive.displayName = 'AudioPlayerTitlePrimitive';

export const AudioPlayerTitlePrimitive = _AudioPlayerTitlePrimitive as PolymorphicComponent<'span'>;
