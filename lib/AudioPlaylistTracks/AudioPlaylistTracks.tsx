import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
/**
 * Props for the audio playlist tracks container component
 */
export type AudioPlaylistTracksProps = PolymorphicProps<'ul'>;

/**
 * Audio playlist tracks component for rendering the scrollable list of playlist tracks
 */
const _AudioPlaylistTracks = (props: AudioPlaylistTracksProps) => {
  const { as: Element = 'ul', className, children, ...restProps } = props;

  return (
    <Element
      className={cn('flex flex-col', 'gap-2 p-4', className)}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistTracks.displayName = 'AudioPlaylistTracks';

export const AudioPlaylistTracks = _AudioPlaylistTracks as PolymorphicComponent<'ul'>;
