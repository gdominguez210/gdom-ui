'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function AudioPlayerInfo(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(bundleMjs.clsx("flex items-center gap-4", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerInfo = AudioPlayerInfo;
