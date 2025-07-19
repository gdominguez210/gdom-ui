import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the audio playlist header component
 */
export type AudioPlaylistHeaderProps = PolymorphicProps<'div'>;

/**
 * Header component for playlist with consistent styling
 */
const _AudioPlaylistHeader = (props: AudioPlaylistHeaderProps) => {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={cn(
        'flex',
        'items-center',
        'justify-between',
        'border-b',
        'border-slate-700',
        'p-4',
        'text-lg',
        'font-medium',
        className,
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistHeader.displayName = 'AudioPlaylistHeader';

export const AudioPlaylistHeader = _AudioPlaylistHeader as PolymorphicComponent<'div'>;
