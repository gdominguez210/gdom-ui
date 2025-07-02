import { jsx } from 'react/jsx-runtime';
import { u as useAudioContext } from './useAudioContext-V0BTlzjl.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { u as useAudioPlayerContextRefs } from './useAudioPlayerContextRefs-BnfUt_UB.js';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { A as AudioVisualizerWaveform } from './AudioVisualizerWaveform-BqrNCwXW.js';

function AudioPlayerVisualizerWaveform(props) {
  const { isPlaying } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();
  const { duration } = useAudioPlayerContextTime();
  const { audioContextRef, isReady, createAudioSource, deleteAudioSource } = useAudioContext();
  return /* @__PURE__ */ jsx(
    AudioVisualizerWaveform,
    {
      ...props,
      isActive: isPlaying,
      audioRef,
      duration,
      audioContextRef,
      isAudioContextReady: isReady,
      createAudioSource,
      deleteAudioSource
    }
  );
}

export { AudioPlayerVisualizerWaveform as A };
