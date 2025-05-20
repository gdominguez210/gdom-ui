'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');
const AudioPlayerAuthorPrimitive = require('./AudioPlayerAuthorPrimitive-CdBC3vkC.js');

function AudioPlayerAuthor(props) {
  const { currentTrack: { author } = {} } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  if (!author) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerAuthorPrimitive.AudioPlayerAuthorPrimitive,
    {
      ...props,
      title: author,
      children: author
    }
  );
}

exports.AudioPlayerAuthor = AudioPlayerAuthor;
