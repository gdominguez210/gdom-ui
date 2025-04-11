import { useAudioContext } from '@lib/AudioContextProvider/useAudioContext';
import { useAudioPlayerContextPlayback } from '@lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';
import {
  AudioVisualizerWaveform,
  type AudioVisualizerWaveformProps,
} from '@lib/AudioVisualizerWaveform/AudioVisualizerWaveform';

export type AudioPlayerVisualizerWaveformProps = Omit<
  AudioVisualizerWaveformProps,
  | 'isPlaying'
  | 'audioRef'
  | 'duration'
  | 'audioContextRef'
  | 'isAudioContextReady'
  | 'createAudioSource'
  | 'deleteAudioSource'
>;

export function AudioPlayerVisualizerWaveform(props: AudioPlayerVisualizerWaveformProps) {
  const { isPlaying } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();
  const { duration } = useAudioPlayerContextTime();
  const { audioContextRef, isReady, createAudioSource, deleteAudioSource } = useAudioContext();

  return (
    <AudioVisualizerWaveform
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
