import { useRef, useEffect, useCallback } from 'react';
import { u as useLatest } from './useLatest-CIF2WkZQ.js';

function useAnimationFrame(options) {
  const { isActive, callback, frameRate, dependencies = [], autoStart = true } = options;
  const animationRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const frameIntervalMs = useRef(frameRate ? 1e3 / frameRate : 0);
  const callbackRef = useLatest(callback);
  useEffect(() => {
    frameIntervalMs.current = frameRate ? 1e3 / frameRate : 0;
  }, [frameRate]);
  const stopAnimation = useCallback(() => {
    if (animationRef.current === null) return;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }, []);
  const animate = useCallback(
    (timeStamp) => {
      if (frameIntervalMs.current > 0) {
        const elapsed = timeStamp - lastFrameTimeRef.current;
        if (elapsed < frameIntervalMs.current) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameTimeRef.current = timeStamp - elapsed % frameIntervalMs.current;
      }
      try {
        callbackRef.current(timeStamp);
      } catch (error) {
        console.error("Error in animation frame callback:", error);
        stopAnimation();
        return;
      }
      animationRef.current = requestAnimationFrame(animate);
    },
    [stopAnimation, callbackRef]
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
  }, [isActive, animate, autoStart, startAnimation, stopAnimation, ...dependencies]);
  return {
    start: startAnimation,
    stop: stopAnimation,
    restart: restartAnimation
  };
}

export { useAnimationFrame as u };
