import { cn } from '@/utils/cn';
import { AudioPlayerTitlePrimitive } from '@/lib/AudioPlayerTitle/AudioPlayerTitlePrimitive';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the audio playlist track title component
 */
export type AudioPlaylistTrackTitlePrimitiveProps = PolymorphicProps<'span'>;

/**
 * Track title component specifically styled for playlist tracks
 */
const _AudioPlaylistTrackTitlePrimitive = (props: AudioPlaylistTrackTitlePrimitiveProps) => {
  const { className, children, ...restProps } = props;

  return (
    <AudioPlayerTitlePrimitive
      className={cn('text-sm', 'leading-tight', 'font-medium', className)}
      {...restProps}
    >
      {children}
    </AudioPlayerTitlePrimitive>
  );
};

_AudioPlaylistTrackTitlePrimitive.displayName = 'AudioPlaylistTrackTitlePrimitive';

export const AudioPlaylistTrackTitlePrimitive =
  _AudioPlaylistTrackTitlePrimitive as PolymorphicComponent<'span'>;
