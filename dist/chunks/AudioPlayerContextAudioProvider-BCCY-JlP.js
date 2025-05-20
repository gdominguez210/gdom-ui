'use strict';

const jsxRuntime = require('react/jsx-runtime');
const AudioContextProvider = require('./AudioContextProvider-BttDPxJO.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');

function AudioPlayerContextAudioProvider(props) {
  const { isPlaying } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioContextProvider.AudioContextProvider,
    {
      isPlaying,
      ...props
    }
  );
}

exports.AudioPlayerContextAudioProvider = AudioPlayerContextAudioProvider;
