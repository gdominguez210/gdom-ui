import { useAudioPlaylistTrackContext } from '@/lib/AudioPlaylistTrackContextProvider/useAudioPlaylistTrackContext';
import { AudioPlaylistTrackTitlePrimitive } from '@/lib/AudioPlaylistTrackTitle/AudioPlaylistTrackTitlePrimitive';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

export type AudioPlaylistTrackTitleProps = PolymorphicProps<'span'>;

const _AudioPlaylistTrackTitle = (props: AudioPlaylistTrackTitleProps) => {
  const {
    track: { title },
  } = useAudioPlaylistTrackContext();

  return <AudioPlaylistTrackTitlePrimitive {...props}>{title}</AudioPlaylistTrackTitlePrimitive>;
};

_AudioPlaylistTrackTitle.displayName = 'AudioPlaylistTrackTitle';

export const AudioPlaylistTrackTitle = _AudioPlaylistTrackTitle as PolymorphicComponent<'span'>;
