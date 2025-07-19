import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the track information container component
 */
export type AudioPlayerInfoProps = PolymorphicProps<'div'>;

/**
 * Container component for displaying track information (image, title, artist)
 */
const _AudioPlayerInfo = (props: AudioPlayerInfoProps) => {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={cn('flex', 'items-center', 'gap-4', className)}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerInfo.displayName = 'AudioPlayerInfo';

export const AudioPlayerInfo = _AudioPlayerInfo as PolymorphicComponent<'div'>;
