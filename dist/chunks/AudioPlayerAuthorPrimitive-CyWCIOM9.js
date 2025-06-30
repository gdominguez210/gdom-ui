'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');

function AudioPlayerAuthorPrimitive(props) {
  const { as: Element = "span", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(clsx.clsx("line-clamp-1 text-sm text-gray-400", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerAuthorPrimitive = AudioPlayerAuthorPrimitive;
