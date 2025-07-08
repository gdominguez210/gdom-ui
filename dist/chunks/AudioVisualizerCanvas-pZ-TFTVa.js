'use strict';

const jsxRuntime = require('react/jsx-runtime');
const CanvasResponsive = require('./CanvasResponsive-C2Oot7ZB.js');
const clsx = require('./clsx-BtxeOLZW.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');

const AudioVisualizerCanvas = (props) => {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          'relative bg-radial from-slate-800 from-0% to-slate-950 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className
        )
      ),
      ...restProps
    }
  );
};

exports.AudioVisualizerCanvas = AudioVisualizerCanvas;
