'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const useAudioPlaylistContext = require('./useAudioPlaylistContext-B1FRcv_T.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-BIqKuaeL.js');
const IconPlayList2Fill = require('./IconPlayList2Fill-BPXvJTUA.js');

function AudioPlaylistControlTogglePrimitive(props) {
  const { active = false, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      active,
      "aria-label": active ? "Hide playlist" : "Show playlist",
      "aria-expanded": active,
      ...restProps,
      children: /* @__PURE__ */ jsxRuntime.jsx(IconPlayList2Fill.IconPlayList2Fill, {})
    }
  );
}

function AudioPlaylistControlToggle(props) {
  const { onClick, ref, ...restProps } = props;
  const { isPlaylistVisible, togglePlaylist, toggleRef, id } = useAudioPlaylistContext.useAudioPlaylistContext();
  const handleClick = React.useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick]
  );
  const composedRef = useComposedRefs.useComposedRefs(toggleRef, ref);
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlaylistControlTogglePrimitive,
    {
      "aria-label": isPlaylistVisible ? "Hide playlist" : "Show playlist",
      "aria-expanded": isPlaylistVisible,
      "aria-controls": id,
      ref: composedRef,
      active: isPlaylistVisible,
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlaylistControlToggle = AudioPlaylistControlToggle;
exports.AudioPlaylistControlTogglePrimitive = AudioPlaylistControlTogglePrimitive;
