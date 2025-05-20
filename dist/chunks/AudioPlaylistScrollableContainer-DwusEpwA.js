'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function AudioPlaylistScrollableContainer(props) {
  const {
    as: Element = "div",
    children,
    className,
    maxHeight = "300px",
    style,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        bundleMjs.clsx(
          "overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-slate-400/30 scrollbar-track-slate-800/20 hover:scrollbar-thumb-slate-400/50",
          "scrollbar-thumb-rounded-none",
          className
        )
      ),
      style: {
        maxHeight,
        ...style
      },
      ...restProps,
      children
    }
  );
}

exports.AudioPlaylistScrollableContainer = AudioPlaylistScrollableContainer;
