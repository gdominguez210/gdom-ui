'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const rafThrottle = require('./rafThrottle-BGv7XLlr.js');
const useResizeObserver = require('./useResizeObserver-DH43lFi-.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');

function useCanvasResponsive(options) {
  const { frameRate, onResize } = options ?? {};
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
    return rafThrottle.rafThrottle((canvas) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = window.devicePixelRatio;
      requestAnimationFrame(() => {
        resizeCanvasDimensions(canvas, width, height, scale);
      });
    }, frameRate);
  }, [frameRate, resizeCanvasDimensions]);
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
        const scale = window.devicePixelRatio;
        resizeCanvasDimensions(node, width, height, scale);
      }
    },
    [resizeCanvasDimensions]
  );
  const mergedRef = useComposedRefs.useComposedRefs(setResizeObserverRef, setCanvasRef);
  return { canvasRef: mergedRef };
}

function CanvasResponsive(props) {
  const { frameRate, onResize, ref, className, ...rest } = props;
  const { canvasRef } = useCanvasResponsive({ frameRate, onResize });
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
