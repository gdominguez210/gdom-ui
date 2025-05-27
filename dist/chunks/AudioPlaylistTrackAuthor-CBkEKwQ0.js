'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlayerAuthorPrimitive = require('./AudioPlayerAuthorPrimitive-DqCb64mv.js');
const useAudioPlaylistTrackContext = require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');

function AudioPlaylistTrackAuthorPrimitive(props) {
  const { as, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerAuthorPrimitive.AudioPlayerAuthorPrimitive,
    {
      as,
      className: bundleMjs.twMerge(clsx.clsx("text-xs", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackAuthor(props) {
  const {
    track: { author }
  } = useAudioPlaylistTrackContext.useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlaylistTrackAuthorPrimitive, { ...props, children: author });
}

exports.AudioPlaylistTrackAuthor = AudioPlaylistTrackAuthor;
exports.AudioPlaylistTrackAuthorPrimitive = AudioPlaylistTrackAuthorPrimitive;
