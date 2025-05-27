import { jsx } from 'react/jsx-runtime';
import { useRef, useCallback, useMemo } from 'react';
import { r as rafThrottle } from './rafThrottle-BNcYsuFP.js';
import { u as useResizeObserver } from './useResizeObserver-CP7BG3kt.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function useCanvasResponsive(options) {
  const { frameRate, onResize } = options ?? {};
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
      const scale = window.devicePixelRatio;
      requestAnimationFrame(() => {
        resizeCanvasDimensions(canvas, width, height, scale);
      });
    }, frameRate);
  }, [frameRate, resizeCanvasDimensions]);
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
        const scale = window.devicePixelRatio;
        resizeCanvasDimensions(node, width, height, scale);
      }
    },
    [resizeCanvasDimensions]
  );
  const mergedRef = useComposedRefs(setResizeObserverRef, setCanvasRef);
  return { canvasRef: mergedRef };
}

function CanvasResponsive(props) {
  const { frameRate, onResize, ref, className, ...rest } = props;
  const { canvasRef } = useCanvasResponsive({ frameRate, onResize });
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
