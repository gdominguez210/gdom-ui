'use strict';

const React = require('react');
const useLatest = require('./useLatest-rOeU5Z3P.js');

function useAnimationFrame(options) {
  const { isActive, callback, frameRate, dependencies = [], autoStart = true } = options;
  const animationRef = React.useRef(null);
  const lastFrameTimeRef = React.useRef(0);
  const frameIntervalMs = React.useRef(frameRate ? 1e3 / frameRate : 0);
  const callbackRef = useLatest.useLatest(callback);
  React.useEffect(() => {
    frameIntervalMs.current = frameRate ? 1e3 / frameRate : 0;
  }, [frameRate]);
  const stopAnimation = React.useCallback(() => {
    if (animationRef.current === null) return;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }, []);
  const animate = React.useCallback(
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
  const startAnimation = React.useCallback(() => {
    if (animationRef.current !== null) {
      return;
    }
    lastFrameTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);
  const restartAnimation = React.useCallback(() => {
    stopAnimation();
    startAnimation();
  }, [startAnimation, stopAnimation]);
  React.useEffect(() => {
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

exports.useAnimationFrame = useAnimationFrame;
