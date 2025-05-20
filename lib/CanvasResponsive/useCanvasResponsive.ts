import { useCallback, useEffect, useMemo } from 'react';
import { rafThrottle } from '@/utils/rafThrottle/rafThrottle';
import { useResizeObserver } from '@/lib/useResizeObserver/useResizeObserver';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
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
        requestAnimationFrame(() => {
          canvas.width = width * scale;
          canvas.height = height * scale;
          context.setTransform(scale, 0, 0, scale, 0, 0);
          onResize?.();
        });
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
