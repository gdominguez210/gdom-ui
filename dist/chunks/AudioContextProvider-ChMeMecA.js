import { jsx } from 'react/jsx-runtime';
import { A as AudioContext } from './AudioContext-BrfuF5ql.js';
import { u as useAudioContextWebAPI } from './useAudioContextWebAPI-wIsWJ5o2.js';

function AudioContextProvider(props) {
  const { children, isPlaying = false } = props;
  const contextValue = useAudioContextWebAPI({ isPlaying });
  return /* @__PURE__ */ jsx(AudioContext.Provider, { value: contextValue, children });
}

export { AudioContextProvider as A };
