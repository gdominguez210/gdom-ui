import { jsx } from 'react/jsx-runtime';
import { useCallback, useMemo, useEffect } from 'react';
import { r as rafThrottle } from './rafThrottle-BNcYsuFP.js';
import { u as useResizeObserver } from './useResizeObserver-CP7BG3kt.js';
import { u as useRefReady } from './useRefReady-BB-Es_A6.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';

function useCanvasResponsive(options) {
  const { frameRate, onResize } = options ?? {};
  const [setCanvasRef, isReady, canvasRef] = useRefReady(null);
  const resizeCanvas = useCallback(
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
  const throttledResize = useMemo(() => {
    return rafThrottle(resizeCanvas, frameRate);
  }, [frameRate, resizeCanvas]);
  const handleResize = useCallback(
    (entries) => {
      if (!entries?.length) return;
      const canvas = entries[0].target;
      throttledResize(canvas);
    },
    [throttledResize]
  );
  const { setRef: setResizeObserverRef } = useResizeObserver(handleResize);
  const mergedRef = useComposedRefs(setResizeObserverRef, setCanvasRef);
  useEffect(() => {
    if (isReady && canvasRef.current) {
      resizeCanvas(canvasRef.current);
    }
  }, [isReady, canvasRef, resizeCanvas]);
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
