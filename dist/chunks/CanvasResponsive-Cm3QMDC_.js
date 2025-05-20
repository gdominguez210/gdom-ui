'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const rafThrottle = require('./rafThrottle-BGv7XLlr.js');
const useResizeObserver = require('./useResizeObserver-DH43lFi-.js');
const useRefReady = require('./useRefReady-BYj4xHLo.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function useCanvasResponsive(options) {
  const { frameRate, onResize } = options ?? {};
  const [setCanvasRef, isReady, canvasRef] = useRefReady.useRefReady(null);
  const resizeCanvas = React.useCallback(
    (canvas) => {
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = window.devicePixelRatio;
      if (canvas.width !== width * scale || canvas.height !== height * scale) {
        requestAnimationFrame(() => {
          canvas.width = width * scale;
          canvas.height = height * scale;
          context.setTransform(scale, 0, 0, scale, 0, 0);
          onResize?.();
        });
      }
    },
    [onResize]
  );
  const throttledResize = React.useMemo(() => {
    return rafThrottle.rafThrottle(resizeCanvas, frameRate);
  }, [frameRate, resizeCanvas]);
  const handleResize = React.useCallback(
    (entries) => {
      if (!entries?.length) return;
      const canvas = entries[0].target;
      throttledResize(canvas);
    },
    [throttledResize]
  );
  const { setRef: setResizeObserverRef } = useResizeObserver.useResizeObserver(handleResize);
  const mergedRef = useComposedRefs.useComposedRefs(setResizeObserverRef, setCanvasRef);
  React.useEffect(() => {
    if (isReady && canvasRef.current) {
      resizeCanvas(canvasRef.current);
    }
  }, [isReady, canvasRef, resizeCanvas]);
  return { canvasRef: mergedRef };
}

function CanvasResponsive(props) {
  const { frameRate, onResize, ref, className, ...rest } = props;
  const { canvasRef } = useCanvasResponsive({ frameRate, onResize });
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "canvas",
    {
      className: bundleMjs.twMerge(bundleMjs.clsx("w-full max-w-full object-contain", className)),
      ref: mergedRef,
      ...rest
    }
  );
}

exports.CanvasResponsive = CanvasResponsive;
exports.useCanvasResponsive = useCanvasResponsive;
