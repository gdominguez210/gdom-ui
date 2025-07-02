'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioContext = require('./useAudioContext-BdZ0YQml.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const AudioVisualizerWaveform = require('./AudioVisualizerWaveform-DCb3DHXQ.js');

function AudioPlayerVisualizerWaveform(props) {
  const { isPlaying } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { duration } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const { audioContextRef, isReady, createAudioSource, deleteAudioSource } = useAudioContext.useAudioContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioVisualizerWaveform.AudioVisualizerWaveform,
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

exports.AudioPlayerVisualizerWaveform = AudioPlayerVisualizerWaveform;
