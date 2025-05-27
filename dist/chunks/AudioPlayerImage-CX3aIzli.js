'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const AudioPlayerImagePrimitive = require('./AudioPlayerImagePrimitive-DM_Q42ET.js');

function AudioPlayerImage(props) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerImagePrimitive.AudioPlayerImagePrimitive,
    {
      ...props,
      src: thumbnail,
      altText: title ? `${title} thumbnail` : ""
    }
  );
}

exports.AudioPlayerImage = AudioPlayerImage;
