'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlaylistTrackContext = require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');
const AudioPlayerControlPlayPrimitive = require('./AudioPlayerControlPlayPrimitive-D_eEdikB.js');
const AudioPlayerImagePrimitive = require('./AudioPlayerImagePrimitive-DM_Q42ET.js');
const clsx = require('./clsx-BtxeOLZW.js');

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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "group relative h-12 w-12 shrink-0 overflow-hidden rounded-md", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      AudioPlayerImagePrimitive.AudioPlayerImagePrimitive,
      {
        src,
        altText,
        width,
        height,
        className: clsx.clsx("h-full w-full rounded-md", { "border-2 border-white": active }, className),
        ...restProps
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: clsx.clsx("absolute inset-0 flex items-center justify-center transition-opacity", {
          "opacity-100": active,
          "opacity-0 group-hover:opacity-100 group-focus:opacity-100": !active
        }),
        children: /* @__PURE__ */ jsxRuntime.jsx(
          AudioPlayerControlPlayPrimitive.AudioPlayerControlPlayPrimitive,
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
  } = useAudioPlaylistTrackContext.useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.AudioPlaylistTrackImage = AudioPlaylistTrackImage;
exports.AudioPlaylistTrackImagePrimitive = AudioPlaylistTrackImagePrimitive;
