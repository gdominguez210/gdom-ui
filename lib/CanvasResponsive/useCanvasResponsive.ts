import { useRef, useEffect, useCallback } from 'react';
import { rafThrottle } from '@lib/utils/rafThrottle/rafThrottle';

/**
 * Options for the useCanvasResponsive hook
 */
export type UseCanvasResponsiveOptions = {
  /**
   * Optional frame rate limit for resize handling (fps)
   */
  frameRate?: number;
};

/**
 * Hook to create a canvas that automatically scales to its size and device pixel ratio
 */
export function useCanvasResponsive(options?: UseCanvasResponsiveOptions) {
  const { frameRate } = options ?? {};

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const scale = window.devicePixelRatio;

    if (canvas.width !== width * scale || canvas.height !== height * scale) {
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const throttledResize = rafThrottle(handleResize, frameRate);

    handleResize();

    const observer = new ResizeObserver(throttledResize);

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [handleResize, frameRate]);

  return canvasRef;
}
