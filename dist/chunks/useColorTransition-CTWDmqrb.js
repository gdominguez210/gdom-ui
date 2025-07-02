'use strict';

const React = require('react');
const interpolateOKLCH = require('./interpolateOKLCH-rIzq_qNl.js');
const useAnimationFrame = require('./useAnimationFrame-CpulgwJu.js');

function useColorTransition(options) {
  const { targetColor, colorTransitionDuration = 500, frameRate = 60 } = options;
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState(targetColor);
  const transitionRef = React.useRef({
    targetOKLCH: interpolateOKLCH.convertColorToOKLCH(targetColor),
    previousOKLCH: interpolateOKLCH.convertColorToOKLCH(targetColor),
    isTransitioning: false,
    progress: 1,
    targetColorString: targetColor,
    transitionStartTime: 0
  });
  const getCurrentColor = React.useCallback(() => {
    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }
    return interpolateOKLCH.interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress
    );
  }, []);
  const getColorString = React.useCallback(() => {
    const [lightness, chroma, hue] = getCurrentColor();
    return interpolateOKLCH.OKLCHToCSS(lightness, chroma, hue);
  }, [getCurrentColor]);
  const getIsTransitioning = React.useCallback(() => {
    return transitionRef.current.isTransitioning;
  }, []);
  const updateTransition = React.useCallback(() => {
    if (targetColor !== transitionRef.current.targetColorString) {
      transitionRef.current.previousOKLCH = transitionRef.current.targetOKLCH;
      transitionRef.current.targetOKLCH = interpolateOKLCH.convertColorToOKLCH(targetColor);
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
  useAnimationFrame.useAnimationFrame({
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

exports.useColorTransition = useColorTransition;
