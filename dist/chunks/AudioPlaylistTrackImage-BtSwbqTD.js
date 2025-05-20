import { jsxs, jsx } from 'react/jsx-runtime';
import { u as useAudioPlaylistTrackContext } from './useAudioPlaylistTrackContext-DJcdpyEq.js';
import { A as AudioPlayerControlPlayPrimitive } from './AudioPlayerControlPlayPrimitive-CcBfrTOf.js';
import { A as AudioPlayerImagePrimitive } from './AudioPlayerImagePrimitive-BwcRwJ4k.js';
import { c as clsx } from './bundle-mjs-Cl353mOg.js';

function AudioPlaylistTrackImagePrimitive(props) {
  const {
    src,
    altText,
    active = false,
    isPlaying = false,
    width = 48,
    height = 48,
    className,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsxs("div", { className: "group relative h-12 w-12 shrink-0 overflow-hidden rounded-md", children: [
    /* @__PURE__ */ jsx(
      AudioPlayerImagePrimitive,
      {
        src,
        altText,
        width,
        height,
        className: clsx("h-full w-full rounded-md", { "border-2 border-white": active }, className),
        ...restProps
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("absolute inset-0 flex items-center justify-center transition-opacity", {
          "opacity-100": active,
          "opacity-0 group-hover:opacity-100 group-focus:opacity-100": !active
        }),
        children: /* @__PURE__ */ jsx(
          AudioPlayerControlPlayPrimitive,
          {
            tabIndex: -1,
            active: active && isPlaying,
            className: "border-none bg-transparent p-0 text-xl shadow-none hover:bg-transparent focus:bg-transparent focus:outline-hidden"
          }
        )
      }
    )
  ] });
}

function AudioPlaylistTrackImage(props) {
  const {
    active,
    isPlaying,
    track: { thumbnail = "", title }
  } = useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsx(
    AudioPlaylistTrackImagePrimitive,
    {
      ...props,
      active,
      isPlaying,
      src: thumbnail,
      altText: `${title} thumbnail`
    }
  );
}

export { AudioPlaylistTrackImage as A, AudioPlaylistTrackImagePrimitive as a };
