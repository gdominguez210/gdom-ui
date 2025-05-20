import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { u as useAudioPlaylistContext } from './useAudioPlaylistContext-CslAPyjC.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-CsltQ7lB.js';
import { I as IconPlayList2Fill } from './IconPlayList2Fill-zkmGiojO.js';

function AudioPlaylistControlTogglePrimitive(props) {
  const { active = false, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      active,
      "aria-label": active ? "Hide playlist" : "Show playlist",
      "aria-expanded": active,
      ...restProps,
      children: /* @__PURE__ */ jsx(IconPlayList2Fill, {})
    }
  );
}

function AudioPlaylistControlToggle(props) {
  const { onClick, ref, ...restProps } = props;
  const { isPlaylistVisible, togglePlaylist, toggleRef, id } = useAudioPlaylistContext();
  const handleClick = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick]
  );
  const composedRef = useComposedRefs(toggleRef, ref);
  return /* @__PURE__ */ jsx(
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

export { AudioPlaylistControlToggle as A, AudioPlaylistControlTogglePrimitive as a };
