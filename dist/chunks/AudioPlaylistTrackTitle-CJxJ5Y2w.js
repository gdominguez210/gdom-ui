'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlaylistTrackContext = require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlayerTitlePrimitive = require('./AudioPlayerTitlePrimitive-VG2ME303.js');

function AudioPlaylistTrackTitlePrimitive(props) {
  const { as, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerTitlePrimitive.AudioPlayerTitlePrimitive,
    {
      as,
      className: bundleMjs.twMerge(clsx.clsx("text-sm leading-tight font-medium", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackTitle(props) {
  const {
    track: { title }
  } = useAudioPlaylistTrackContext.useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlaylistTrackTitlePrimitive, { ...props, children: title });
}

exports.AudioPlaylistTrackTitle = AudioPlaylistTrackTitle;
exports.AudioPlaylistTrackTitlePrimitive = AudioPlaylistTrackTitlePrimitive;
