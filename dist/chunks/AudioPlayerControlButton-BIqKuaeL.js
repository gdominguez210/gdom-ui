'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function AudioPlayerControlButton(props) {
  const { active = false, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      className: bundleMjs.twMerge(
        bundleMjs.clsx(
          "rounded-md p-2 focus-within:outline-white hover:bg-black/30 focus:bg-black/30",
          active && "bg-black/30",
          className
        )
      ),
      type: "button",
      ...restProps,
      children
    }
  );
}

exports.AudioPlayerControlButton = AudioPlayerControlButton;
