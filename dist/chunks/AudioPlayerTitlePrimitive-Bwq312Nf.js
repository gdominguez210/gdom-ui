'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function AudioPlayerTitlePrimitive(props) {
  const { as: Element = "p", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(bundleMjs.clsx("line-clamp-1 font-bold lg:max-w-64 lg:truncate", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerTitlePrimitive = AudioPlayerTitlePrimitive;
