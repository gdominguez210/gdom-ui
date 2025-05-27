'use strict';

const jsxRuntime = require('react/jsx-runtime');
const clsx = require('./clsx-BtxeOLZW.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');

function AudioPlayerTitlePrimitive(props) {
  const { as: Element = "span", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(clsx.clsx("line-clamp-1 font-bold lg:max-w-64 lg:truncate", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerTitlePrimitive = AudioPlayerTitlePrimitive;
