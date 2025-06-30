'use strict';

const jsxRuntime = require('react/jsx-runtime');
const AudioContext = require('./AudioContext-vMYKRZEV.js');
const useAudioContextWebAPI = require('./useAudioContextWebAPI-CNxlQXAE.js');

function AudioContextProvider(props) {
  const { children, isPlaying = false } = props;
  const contextValue = useAudioContextWebAPI.useAudioContextWebAPI({ isPlaying });
  return /* @__PURE__ */ jsxRuntime.jsx(AudioContext.AudioContext.Provider, { value: contextValue, children });
}

exports.AudioContextProvider = AudioContextProvider;
