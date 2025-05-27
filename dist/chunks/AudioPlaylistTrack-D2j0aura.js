'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');
const useAudioPlaylistTrackContext = require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');

function AudioPlaylistTrackPrimitive(props) {
  const { active, as: Element = "li", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      tabIndex: 0,
      role: "button",
      "aria-current": active ? "true" : "false",
      className: bundleMjs.twMerge(
        clsx.clsx(
          "flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors duration-200 focus-within:outline-white",
          {
            "bg-black/50": active,
            "hover:bg-black/30 focus-visible:bg-black/30": !active
          },
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrack(props) {
  const { onClick, onKeyDown, children, ...restProps } = props;
  const {
    active,
    onSelect,
    track: { title, author }
  } = useAudioPlaylistTrackContext.useAudioPlaylistTrackContext();
  const handleClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onSelect();
      onClick?.(e);
    },
    [onSelect, onClick]
  );
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect();
      }
      onKeyDown?.(e);
    },
    [onSelect, onKeyDown]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlaylistTrackPrimitive,
    {
      active,
      "aria-label": `Play ${title} by ${author}`,
      ...restProps,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      children
    }
  );
}

exports.AudioPlaylistTrack = AudioPlaylistTrack;
exports.AudioPlaylistTrackPrimitive = AudioPlaylistTrackPrimitive;
