import {
  AudioContextProvider,
  type AudioContextProviderProps,
} from '@lib/AudioContextProvider/AudioContextProvider';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';

export type AudioPlayerContextAudioProviderProps = Omit<AudioContextProviderProps, 'isPlaying'>;

export function AudioPlayerContextAudioProvider(props: AudioPlayerContextAudioProviderProps) {
  const { isPlaying } = useAudioPlayerContextPlayback();
  return (
    <AudioContextProvider
      isPlaying={isPlaying}
      {...props}
    />
  );
}
