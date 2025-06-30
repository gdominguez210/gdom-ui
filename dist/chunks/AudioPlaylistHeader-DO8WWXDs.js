'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');

function AudioPlaylistHeader(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          "flex items-center justify-between border-b border-slate-700 p-4 text-lg font-medium",
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

exports.AudioPlaylistHeader = AudioPlaylistHeader;
