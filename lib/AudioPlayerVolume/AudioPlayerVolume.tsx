import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the volume control component
 */
export type AudioPlayerVolumeProps = PolymorphicProps<'div'>;

/**
 * Base container component for volume controls
 */
const _AudioPlayerVolume = (props: AudioPlayerVolumeProps) => {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={cn('flex', 'items-center', 'gap-2', className)}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerVolume.displayName = 'AudioPlayerVolume';

export const AudioPlayerVolume = _AudioPlayerVolume as PolymorphicComponent<'div'>;
