'use strict';

const jsxRuntime = require('react/jsx-runtime');
const AudioPlayerContextRefsProvider = require('./AudioPlayerContextRefsProvider-BWgnFZ1u.js');
const AudioPlayerContextTrackProvider = require('./AudioPlayerContextTrackProvider-BUM_lDg3.js');
const AudioPlayerContextTimeProvider = require('./AudioPlayerContextTimeProvider-DBRHiXJ5.js');
const AudioPlayerContextPlaybackProvider = require('./AudioPlayerContextPlaybackProvider-D4qTs2bF.js');

function AudioPlayerContextProvider({
  children,
  defaultTrackIndex,
  defaultVolume,
  defaultMute,
  defaultShuffle,
  defaultLoop,
  tracks
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlayerContextRefsProvider.AudioPlayerContextRefsProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerContextTrackProvider.AudioPlayerContextTrackProvider,
    {
      defaultTrackIndex,
      tracks,
      children: /* @__PURE__ */ jsxRuntime.jsx(AudioPlayerContextTimeProvider.AudioPlayerContextTimeProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(
        AudioPlayerContextPlaybackProvider.AudioPlayerContextPlaybackProvider,
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

exports.AudioPlayerContextProvider = AudioPlayerContextProvider;
