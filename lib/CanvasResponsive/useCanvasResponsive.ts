import { useCallback, useEffect, useMemo } from 'react';
import { rafThrottle } from '@lib/utils/rafThrottle/rafThrottle';
import { useResizeObserver } from '@lib/useResizeObserver/useResizeObserver';
import { useRefReady } from '@lib/useRefReady/useRefReady';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';

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
};

/**
 * Hook to create a canvas that automatically scales to its size and device pixel ratio
 */
export function useCanvasResponsive(options?: UseCanvasResponsiveOptions) {
  const { frameRate, onResize } = options ?? {};

  const [setCanvasRef, isReady, canvasRef] = useRefReady<HTMLCanvasElement | null>(null);

  const resizeCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = window.devicePixelRatio;

      if (canvas.width !== width * scale || canvas.height !== height * scale) {
        console.log('resizing canvas', width, height, scale);
        canvas.width = width * scale;
        canvas.height = height * scale;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        onResize?.();
      }
    },
    [onResize],
  );

  const throttledResize = useMemo(() => {
    return rafThrottle(resizeCanvas, frameRate);
  }, [frameRate, resizeCanvas]);

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!entries?.length) return;

      const canvas = entries[0]!.target as HTMLCanvasElement;
      // Log the exact dimensions that are triggering the resize
      console.log('ResizeObserver fired:', {
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        offsetWidth: canvas.offsetWidth,
        offsetHeight: canvas.offsetHeight,
        scrollWidth: canvas.scrollWidth,
        scrollHeight: canvas.scrollHeight,
        time: performance.now(),
      });
      throttledResize(canvas);
    },
    [throttledResize],
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
