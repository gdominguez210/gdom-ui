import { jsx } from 'react/jsx-runtime';
import { A as AudioPlayerContextRefsProvider } from './AudioPlayerContextRefsProvider-DHzm5pYJ.js';
import { A as AudioPlayerContextTrackProvider } from './AudioPlayerContextTrackProvider-_yq1UN1D.js';
import { A as AudioPlayerContextTimeProvider } from './AudioPlayerContextTimeProvider-DQcZUewH.js';
import { A as AudioPlayerContextPlaybackProvider } from './AudioPlayerContextPlaybackProvider-D3Fs5HHA.js';

function AudioPlayerContextProvider({
  children,
  defaultTrackIndex,
  defaultVolume,
  defaultMute,
  defaultShuffle,
  defaultLoop,
  tracks
}) {
  return /* @__PURE__ */ jsx(AudioPlayerContextRefsProvider, { children: /* @__PURE__ */ jsx(
    AudioPlayerContextTrackProvider,
    {
      defaultTrackIndex,
      tracks,
      children: /* @__PURE__ */ jsx(AudioPlayerContextTimeProvider, { children: /* @__PURE__ */ jsx(
        AudioPlayerContextPlaybackProvider,
        {
          defaultVolume,
          defaultMute,
          defaultShuffle,
          defaultLoop,
          children
        }
      ) })
    }
  ) });
}

export { AudioPlayerContextProvider as A };
