import { jsx } from 'react/jsx-runtime';
import { A as AudioContextProvider } from './AudioContextProvider-ChMeMecA.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';

function AudioPlayerContextAudioProvider(props) {
  const { isPlaying } = useAudioPlayerContextPlayback();
  return /* @__PURE__ */ jsx(
    AudioContextProvider,
    {
      isPlaying,
      ...props
    }
  );
}

export { AudioPlayerContextAudioProvider as A };
