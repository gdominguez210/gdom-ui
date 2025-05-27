'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlaylistContext = require('./useAudioPlaylistContext-B1FRcv_T.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');
const IconCloseFill = require('./IconCloseFill-BqK6cK35.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-Dln4zNzP.js');

function AudioPlaylistDismissPrimitive(props) {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      "aria-label": "Close playlist",
      className: bundleMjs.twMerge(clsx.clsx("text-2xl", className)),
      ...restProps,
      children: /* @__PURE__ */ jsxRuntime.jsx(IconCloseFill.IconCloseFill, {})
    }
  );
}

function AudioPlaylistDismiss(props) {
  const { className, onClick, ...restProps } = props;
  const { togglePlaylist } = useAudioPlaylistContext.useAudioPlaylistContext();
  const handleClick = React.useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlaylistDismissPrimitive,
    {
      "aria-label": "Close playlist",
      onClick: handleClick,
      className,
      ...restProps
    }
  );
}

exports.AudioPlaylistDismiss = AudioPlaylistDismiss;
exports.AudioPlaylistDismissPrimitive = AudioPlaylistDismissPrimitive;
