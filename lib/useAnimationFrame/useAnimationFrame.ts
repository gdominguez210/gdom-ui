import { useCallback, useEffect, useRef } from 'react';

export type useAnimationFrameOptions = {
  /**
   * Whether the animation should be running
   */
  isActive: boolean;

  /**
   * Callback function to execute on each animation frame
   */
  callback: (timestamp: number) => void;

  /**
   * Optional frame rate limit in frames per second
   * If not provided, runs at browser's native refresh rate
   */
  frameRate?: number;

  /**
   * Optional dependencies that should trigger a reset of the animation
   * when changed (similar to useEffect dependencies)
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  dependencies?: any[];

  /**
   * Whether to automatically start/stop the animation based on isActive
   * If false, you must manually control the animation with start/stop methods
   * @default true
   */
  autoStart?: boolean;
};

export type useAnimationFrameReturn = {
  start: () => void;
  stop: () => void;
  restart: () => void;
};

export function useAnimationFrame(options: useAnimationFrameOptions): useAnimationFrameReturn {
  const { isActive, callback, frameRate, dependencies = [], autoStart = true } = options;

  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const frameIntervalMs = useRef<number>(frameRate ? 1000 / frameRate : 0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    frameIntervalMs.current = frameRate ? 1000 / frameRate : 0;
  }, [frameRate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current === null) return;

    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }, []);

  const animate = useCallback(
    (timeStamp: number) => {
      if (frameIntervalMs.current > 0) {
        const elapsed = timeStamp - lastFrameTimeRef.current;

        if (elapsed < frameIntervalMs.current) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        lastFrameTimeRef.current = timeStamp - (elapsed % frameIntervalMs.current);
      }

      try {
        callbackRef.current(timeStamp);
      } catch (error) {
        console.error('Error in animation frame callback:', error);
        stopAnimation();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [stopAnimation],
  );

  const startAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      return;
    }

    lastFrameTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const restartAnimation = useCallback(() => {
    stopAnimation();
    startAnimation();
  }, [startAnimation, stopAnimation]);

  useEffect(() => {
    if (!autoStart) return;

    isActive ? startAnimation() : stopAnimation();

    return () => {
      stopAnimation();
    };

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isActive, animate, autoStart, startAnimation, stopAnimation, ...dependencies]);

  return {
    start: startAnimation,
    stop: stopAnimation,
    restart: restartAnimation,
  };
}
