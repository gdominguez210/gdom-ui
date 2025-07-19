import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the audio playlist primitive component
 */
export type AudioPlaylistContainerProps = PolymorphicProps<'div'>;

/**
 * Base component for displaying a playlist of audio tracks, providing the essential markup
 */
const _AudioPlaylistContainer = (props: AudioPlaylistContainerProps) => {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={cn(
        'flex',
        'flex-col',
        'border-slate-600',
        'bg-slate-800',
        'text-neutral-100',
        className,
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistContainer.displayName = 'AudioPlaylistContainer';

export const AudioPlaylistContainer = _AudioPlaylistContainer as PolymorphicComponent<'div'>;
