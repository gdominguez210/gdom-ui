import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { u as useAudioPlaylistTrackContext } from './useAudioPlaylistTrackContext-DJcdpyEq.js';

function AudioPlaylistTrackPrimitive(props) {
  const { active, as: Element = "li", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      tabIndex: 0,
      role: "button",
      "aria-current": active ? "true" : "false",
      className: twMerge(
        clsx(
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
  } = useAudioPlaylistTrackContext();
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      onSelect();
      onClick?.(e);
    },
    [onSelect, onClick]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect();
      }
      onKeyDown?.(e);
    },
    [onSelect, onKeyDown]
  );
  return /* @__PURE__ */ jsx(
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

export { AudioPlaylistTrack as A, AudioPlaylistTrackPrimitive as a };
