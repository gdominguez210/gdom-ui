'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const AudioPlayerTitlePrimitive = require('./AudioPlayerTitlePrimitive-Cd7yNS99.js');

function AudioPlayerTitle(props) {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  if (!title) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerTitlePrimitive.AudioPlayerTitlePrimitive,
    {
      title,
      ...props,
      children: title
    }
  );
}

exports.AudioPlayerTitle = AudioPlayerTitle;
