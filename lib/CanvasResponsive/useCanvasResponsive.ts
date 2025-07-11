import { useCallback, useMemo, useRef } from 'react';
import { rafThrottle } from '@/utils/rafThrottle';
import { useResizeObserver } from '@/lib/useResizeObserver/useResizeObserver';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

/**
 * Options for the useCanvasResponsive hook
 */
export type UseCanvasResponsiveOptions = {
  /**
   * Optional callback to be called when the canvas is resized
   */
  onResize?: () => void;
  /**
   * Optional frame rate limit for resize handling (fps)
   */
  frameRate?: number;
  /**
   * Custom device pixel ratio override. When provided, this value is used instead of
   * the native window.devicePixelRatio.
   * @default window.devicePixelRatio || 1
   */
  devicePixelRatio?: number;
};

/**
 * Hook to create a canvas that automatically scales to its size and device pixel ratio
 */
export function useCanvasResponsive(options?: UseCanvasResponsiveOptions) {
  const { frameRate, onResize, devicePixelRatio = window.devicePixelRatio || 1 } = options ?? {};
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resizeCanvasDimensions = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number, scale: number) => {
      const context = canvas.getContext('2d');
      if (!context) return;

      if (canvas.width !== width * scale || canvas.height !== height * scale) {
        canvas.width = width * scale;
        canvas.height = height * scale;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        onResize?.();
      }
    },
    [onResize],
  );

  const throttledResize = useMemo(() => {
    return rafThrottle((canvas: HTMLCanvasElement) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = devicePixelRatio;

      // set canvas dimensions on new animation frame to prevent layout thrashing
      requestAnimationFrame(() => {
        resizeCanvasDimensions(canvas, width, height, scale);
      });
    }, frameRate);
  }, [frameRate, resizeCanvasDimensions, devicePixelRatio]);

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!entries?.length) return;
      const canvas = entries[0]!.target as HTMLCanvasElement;
      throttledResize(canvas);
    },
    [throttledResize],
  );

  const { setRef: setResizeObserverRef } = useResizeObserver(handleResize);

  const setCanvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      canvasRef.current = node;
      if (node) {
        // For initial setup, it's safe to read/write immediately
        const width = node.clientWidth;
        const height = node.clientHeight;
        const scale = devicePixelRatio ?? (window.devicePixelRatio || 1);
        resizeCanvasDimensions(node, width, height, scale);
      }
    },
    [resizeCanvasDimensions, devicePixelRatio],
  );

  const mergedRef = useComposedRefs(setResizeObserverRef, setCanvasRef);

  return { canvasRef: mergedRef };
}
