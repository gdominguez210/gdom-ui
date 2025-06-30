'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');

function AudioPlayerControls(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(clsx.clsx("flex items-center justify-center gap-1 p-4 text-2xl", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerControls = AudioPlayerControls;
