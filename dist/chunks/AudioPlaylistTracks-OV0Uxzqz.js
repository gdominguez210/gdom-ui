'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');

function AudioPlaylistTracks(props) {
  const { as: Element = "ul", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(clsx.clsx("flex flex-col gap-2 p-4", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlaylistTracks = AudioPlaylistTracks;
