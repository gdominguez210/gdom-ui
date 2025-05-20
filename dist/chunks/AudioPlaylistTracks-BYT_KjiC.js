'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function AudioPlaylistTracks(props) {
  const { as: Element = "ul", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(bundleMjs.clsx("flex flex-col gap-2 p-4", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlaylistTracks = AudioPlaylistTracks;
