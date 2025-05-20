'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function AudioPlayerAuthorPrimitive(props) {
  const { as: Element = "p", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(bundleMjs.clsx("line-clamp-1 text-sm text-gray-400", className)),
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerAuthorPrimitive = AudioPlayerAuthorPrimitive;
