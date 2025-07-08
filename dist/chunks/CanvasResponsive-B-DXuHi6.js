import { jsx } from 'react/jsx-runtime';
import { useRef, useCallback, useMemo } from 'react';
import { r as rafThrottle } from './rafThrottle-BNcYsuFP.js';
import { u as useResizeObserver } from './useResizeObserver-CP7BG3kt.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { u as useDevicePixelRatioAdaptive } from './useDevicePixelRatioAdaptive-BMsOlPeg.js';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function useCanvasResponsive(options) {
  const { frameRate, onResize, devicePixelRatio = window.devicePixelRatio || 1 } = options ?? {};
  const canvasRef = useRef(null);
  const resizeCanvasDimensions = useCallback(
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
  const throttledResize = useMemo(() => {
    return rafThrottle((canvas) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = devicePixelRatio;
      requestAnimationFrame(() => {
        resizeCanvasDimensions(canvas, width, height, scale);
      });
    }, frameRate);
  }, [frameRate, resizeCanvasDimensions, devicePixelRatio]);
  const handleResize = useCallback(
    (entries) => {
      if (!entries?.length) return;
      const canvas = entries[0].target;
      throttledResize(canvas);
    },
    [throttledResize]
  );
  const { setRef: setResizeObserverRef } = useResizeObserver(handleResize);
  const setCanvasRef = useCallback(
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
  const mergedRef = useComposedRefs(setResizeObserverRef, setCanvasRef);
  return { canvasRef: mergedRef };
}

function CanvasResponsive(props) {
  const { frameRate, onResize, ref, className, devicePixelRatio, resolutionMode, ...rest } = props;
  const { adaptiveDevicePixelRatio } = useDevicePixelRatioAdaptive({ resolutionMode });
  const { canvasRef } = useCanvasResponsive({
    frameRate,
    onResize,
    devicePixelRatio: devicePixelRatio ?? adaptiveDevicePixelRatio
  });
  const mergedRef = useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      className: twMerge(clsx("w-full max-w-full object-contain", className)),
      ref: mergedRef,
      ...rest
    }
  );
}

export { CanvasResponsive as C, useCanvasResponsive as u };
