import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the audio playlist primitive component
 */
export type AudioPlayerContainerProps = PolymorphicProps<'div'>;

/**
 * Base wrapper component for the audio player UI
 */
const _AudioPlayerContainer = (props: AudioPlayerContainerProps) => {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={cn(
        'flex',
        'flex-col',
        'justify-center',
        'overflow-hidden',
        'rounded-md',
        'bg-slate-700',
        'text-neutral-100',
        className,
      )}
      tabIndex={-1}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlayerContainer.displayName = 'AudioPlayerContainer';

export const AudioPlayerContainer = _AudioPlayerContainer as PolymorphicComponent<'div'>;
