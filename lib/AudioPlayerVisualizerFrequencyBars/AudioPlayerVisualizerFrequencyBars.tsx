import { useAudioContext } from '@lib/AudioContextProvider/useAudioContext';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import {
  AudioVisualizerFrequencyBars,
  type AudioVisualizerFrequencyBarsProps,
} from '@lib/AudioVisualizerFrequencyBars/AudioVisualizerFrequencyBars';

export type AudioPlayerVisualizerFrequencyBarsProps = Omit<
  AudioVisualizerFrequencyBarsProps,
  | 'isPlaying'
  | 'audioRef'
  | 'duration'
  | 'audioContextRef'
  | 'isAudioContextReady'
  | 'createAudioSource'
  | 'deleteAudioSource'
>;

export function AudioPlayerVisualizerFrequencyBars(props: AudioPlayerVisualizerFrequencyBarsProps) {
  const { isPlaying } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();
  const { duration } = useAudioPlayerContextTime();
  const { audioContextRef, isReady, createAudioSource, deleteAudioSource } = useAudioContext();

  return (
    <AudioVisualizerFrequencyBars
      {...props}
      isPlaying={isPlaying}
      audioRef={audioRef}
      duration={duration}
      audioContextRef={audioContextRef}
      isAudioContextReady={isReady}
      createAudioSource={createAudioSource}
      deleteAudioSource={deleteAudioSource}
    />
  );
}
