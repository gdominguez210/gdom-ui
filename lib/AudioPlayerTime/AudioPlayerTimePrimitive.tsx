import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the time display primitive component
 */
export type AudioPlayerTimePrimitiveProps = PolymorphicProps<'span'>;

/**
 * Base component for displaying formatted audio playback time
 */
const _AudioPlayerTimePrimitive = (props: AudioPlayerTimePrimitiveProps) => {
  const { as: Element = 'span', className, children, ...restProps } = props;

  return (
    <Element
      className={cn(
        'line-clamp-1',
        'inline-block',
        'min-w-[6ch]',
        'truncate',
        'font-mono',
        'text-sm',
        'tabular-nums',
        className,
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerTimePrimitive.displayName = 'AudioPlayerTimePrimitive';

export const AudioPlayerTimePrimitive = _AudioPlayerTimePrimitive as PolymorphicComponent<'span'>;
