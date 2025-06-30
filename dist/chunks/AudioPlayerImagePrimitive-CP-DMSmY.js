'use strict';

const jsxRuntime = require('react/jsx-runtime');
const clsx = require('./clsx-BtxeOLZW.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const IconDiscFill = require('./IconDiscFill-DDSP8Tu7.js');

function AudioPlayerImagePrimitive(props) {
  const {
    as: Element = "div",
    className,
    altText,
    width = 96,
    height = 96,
    src,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          "flex h-24 w-24 items-center justify-center overflow-hidden bg-neutral-100/10",
          className
        )
      ),
      ...restProps,
      children: src ? /* @__PURE__ */ jsxRuntime.jsx(
        "img",
        {
          src,
          alt: altText,
          className: "h-full w-full object-cover",
          width,
          height
        }
      ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-4xl", children: /* @__PURE__ */ jsxRuntime.jsx(IconDiscFill.IconDiscFill, {}) }) })
    }
  );
}

exports.AudioPlayerImagePrimitive = AudioPlayerImagePrimitive;
