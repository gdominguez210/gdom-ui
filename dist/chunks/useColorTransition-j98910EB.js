import { useState, useRef, useCallback } from 'react';
import { c as convertColorToOKLCH, i as interpolateOKLCH, O as OKLCHToCSS } from './interpolateOKLCH-C_xAKj2b.js';
import { u as useAnimationFrame } from './useAnimationFrame-1lZDWPZz.js';

function useColorTransition(options) {
  const { targetColor, colorTransitionDuration = 500, frameRate = 60 } = options;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentColor, setCurrentColor] = useState(targetColor);
  const transitionRef = useRef({
    targetOKLCH: convertColorToOKLCH(targetColor),
    previousOKLCH: convertColorToOKLCH(targetColor),
    isTransitioning: false,
    progress: 1,
    targetColorString: targetColor,
    transitionStartTime: 0
  });
  const getCurrentColor = useCallback(() => {
    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }
    return interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress
    );
  }, []);
  const getColorString = useCallback(() => {
    const [lightness, chroma, hue] = getCurrentColor();
    return OKLCHToCSS(lightness, chroma, hue);
  }, [getCurrentColor]);
  const getIsTransitioning = useCallback(() => {
    return transitionRef.current.isTransitioning;
  }, []);
  const updateTransition = useCallback(() => {
    if (targetColor !== transitionRef.current.targetColorString) {
      transitionRef.current.previousOKLCH = transitionRef.current.targetOKLCH;
      transitionRef.current.targetOKLCH = convertColorToOKLCH(targetColor);
      transitionRef.current.targetColorString = targetColor;
      transitionRef.current.progress = 0;
      transitionRef.current.transitionStartTime = performance.now();
      transitionRef.current.isTransitioning = true;
      setIsTransitioning(true);
    }
    const now = performance.now();
    const elapsed = now - transitionRef.current.transitionStartTime;
    transitionRef.current.progress = Math.min(elapsed / colorTransitionDuration, 1);
    setCurrentColor(getColorString());
    if (transitionRef.current.progress >= 1) {
      transitionRef.current.progress = 1;
      transitionRef.current.isTransitioning = false;
      setIsTransitioning(false);
    }
  }, [targetColor, colorTransitionDuration, getColorString]);
  useAnimationFrame({
    isActive: targetColor !== transitionRef.current.targetColorString || isTransitioning,
    callback: updateTransition,
    frameRate,
    dependencies: [targetColor, colorTransitionDuration]
  });
  return {
    getCurrentColor,
    getColorString,
    getIsTransitioning,
    currentColor
  };
}

export { useColorTransition as u };
