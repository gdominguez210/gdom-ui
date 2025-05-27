import { useRef, useEffect, useCallback } from 'react';
import { c as convertColorToOKLCH, i as interpolateOKLCH, O as OKLCHToCSS } from './interpolateOKLCH-C_xAKj2b.js';

function useColorTransition(options) {
  const { targetColor, transitionDuration = 500 } = options;
  const transitionRef = useRef({
    targetOKLCH: convertColorToOKLCH(targetColor),
    previousOKLCH: convertColorToOKLCH(targetColor),
    isTransitioning: false,
    progress: 1,
    targetColorString: targetColor
  });
  const timeRef = useRef({
    transitionStartTime: 0
  });
  useEffect(() => {
    if (targetColor !== transitionRef.current.targetColorString) {
      transitionRef.current.previousOKLCH = transitionRef.current.targetOKLCH;
      transitionRef.current.targetOKLCH = convertColorToOKLCH(targetColor);
      transitionRef.current.targetColorString = targetColor;
      transitionRef.current.isTransitioning = true;
      transitionRef.current.progress = 0;
      timeRef.current.transitionStartTime = performance.now();
    }
  }, [targetColor]);
  const updateTransition = useCallback(() => {
    const now = performance.now();
    const elapsed = now - timeRef.current.transitionStartTime;
    transitionRef.current.progress = Math.min(elapsed / transitionDuration, 1);
    if (transitionRef.current.progress >= 1) {
      transitionRef.current.isTransitioning = false;
      transitionRef.current.progress = 1;
    }
  }, [transitionDuration]);
  const getCurrentColor = useCallback(() => {
    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }
    updateTransition();
    return interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress
    );
  }, [updateTransition]);
  const getColorString = useCallback(() => {
    const [lightness, chroma, hue] = getCurrentColor();
    return OKLCHToCSS(lightness, chroma, hue);
  }, [getCurrentColor]);
  const isTransitioning = useCallback(() => {
    return transitionRef.current.isTransitioning;
  }, []);
  return {
    getCurrentColor,
    getColorString,
    isTransitioning,
    updateTransition
  };
}

export { useColorTransition as u };
