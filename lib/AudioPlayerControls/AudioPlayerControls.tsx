import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the playback controls container
 */
export type AudioPlayerControlsProps = PolymorphicProps<'div'>;

/**
 * Base component for laying out audio player controls
 */
const _AudioPlayerControls = (props: AudioPlayerControlsProps) => {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={cn(
        'flex',
        'items-center',
        'justify-center',
        'gap-1',
        'p-4',
        'text-2xl',
        className,
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerControls.displayName = 'AudioPlayerControls';

export const AudioPlayerControls = _AudioPlayerControls as PolymorphicComponent<'div'>;
