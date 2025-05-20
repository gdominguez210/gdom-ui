import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlaylistTrackContext } from './useAudioPlaylistTrackContext-DJcdpyEq.js';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { A as AudioPlayerTitlePrimitive } from './AudioPlayerTitlePrimitive-bvxqG3xR.js';

function AudioPlaylistTrackTitlePrimitive(props) {
  const { as, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerTitlePrimitive,
    {
      as,
      className: twMerge(clsx("text-sm leading-tight font-medium", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackTitle(props) {
  const {
    track: { title }
  } = useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsx(AudioPlaylistTrackTitlePrimitive, { ...props, children: title });
}

export { AudioPlaylistTrackTitle as A, AudioPlaylistTrackTitlePrimitive as a };
