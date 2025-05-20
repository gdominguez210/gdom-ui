import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useAudioPlaylistContext } from './useAudioPlaylistContext-CslAPyjC.js';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { I as IconCloseFill } from './IconCloseFill-ByY66hiE.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-CsltQ7lB.js';

function AudioPlaylistDismissPrimitive(props) {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": "Close playlist",
      className: twMerge(clsx("text-2xl", className)),
      ...restProps,
      children: /* @__PURE__ */ jsx(IconCloseFill, {})
    }
  );
}

function AudioPlaylistDismiss(props) {
  const { className, onClick, ...restProps } = props;
  const { togglePlaylist } = useAudioPlaylistContext();
  const handleClick = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlaylistDismissPrimitive,
    {
      "aria-label": "Close playlist",
      onClick: handleClick,
      className,
      ...restProps
    }
  );
}

export { AudioPlaylistDismiss as A, AudioPlaylistDismissPrimitive as a };
