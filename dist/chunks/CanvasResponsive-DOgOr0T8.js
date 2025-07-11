'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const index = require('./index-BGv7XLlr.js');
const useResizeObserver = require('./useResizeObserver-CdiaHoe_.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const useDevicePixelRatioAdaptive = require('./useDevicePixelRatioAdaptive-Bh0LmmaO.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');

function useCanvasResponsive(options) {
  const { frameRate, onResize, devicePixelRatio = window.devicePixelRatio || 1 } = options ?? {};
  const canvasRef = React.useRef(null);
  const resizeCanvasDimensions = React.useCallback(
    (canvas, width, height, scale) => {
      const context = canvas.getContext("2d");
      if (!context) return;
      if (canvas.width !== width * scale || canvas.height !== height * scale) {
        canvas.width = width * scale;
        canvas.height = height * scale;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        onResize?.();
      }
    },
    [onResize]
  );
  const throttledResize = React.useMemo(() => {
    return index.rafThrottle((canvas) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = devicePixelRatio;
      requestAnimationFrame(() => {
        resizeCanvasDimensions(canvas, width, height, scale);
      });
    }, frameRate);
  }, [frameRate, resizeCanvasDimensions, devicePixelRatio]);
  const handleResize = React.useCallback(
    (entries) => {
      if (!entries?.length) return;
      const canvas = entries[0].target;
      throttledResize(canvas);
    },
    [throttledResize]
  );
  const { setRef: setResizeObserverRef } = useResizeObserver.useResizeObserver(handleResize);
  const setCanvasRef = React.useCallback(
    (node) => {
      canvasRef.current = node;
      if (node) {
        const width = node.clientWidth;
        const height = node.clientHeight;
        const scale = devicePixelRatio ?? (window.devicePixelRatio || 1);
        resizeCanvasDimensions(node, width, height, scale);
      }
    },
    [resizeCanvasDimensions, devicePixelRatio]
  );
  const mergedRef = useComposedRefs.useComposedRefs(setResizeObserverRef, setCanvasRef);
  return { canvasRef: mergedRef };
}

function CanvasResponsive(props) {
  const { frameRate, onResize, ref, className, devicePixelRatio, resolutionMode, ...rest } = props;
  const { adaptiveDevicePixelRatio } = useDevicePixelRatioAdaptive.useDevicePixelRatioAdaptive({ resolutionMode });
  const { canvasRef } = useCanvasResponsive({
    frameRate,
    onResize,
    devicePixelRatio: devicePixelRatio ?? adaptiveDevicePixelRatio
  });
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "canvas",
    {
      className: bundleMjs.twMerge(clsx.clsx("w-full max-w-full object-contain", className)),
      ref: mergedRef,
      ...rest
    }
  );
}

exports.CanvasResponsive = CanvasResponsive;
exports.useCanvasResponsive = useCanvasResponsive;
