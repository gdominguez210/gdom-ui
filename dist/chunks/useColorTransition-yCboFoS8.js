'use strict';

const React = require('react');
const interpolateOKLCH = require('./interpolateOKLCH-rIzq_qNl.js');

function useColorTransition(options) {
  const { targetColor, transitionDuration = 500 } = options;
  const transitionRef = React.useRef({
    targetOKLCH: interpolateOKLCH.convertColorToOKLCH(targetColor),
    previousOKLCH: interpolateOKLCH.convertColorToOKLCH(targetColor),
    isTransitioning: false,
    progress: 1,
    targetColorString: targetColor
  });
  const timeRef = React.useRef({
    transitionStartTime: 0
  });
  React.useEffect(() => {
    if (targetColor !== transitionRef.current.targetColorString) {
      transitionRef.current.previousOKLCH = transitionRef.current.targetOKLCH;
      transitionRef.current.targetOKLCH = interpolateOKLCH.convertColorToOKLCH(targetColor);
      transitionRef.current.targetColorString = targetColor;
      transitionRef.current.isTransitioning = true;
      transitionRef.current.progress = 0;
      timeRef.current.transitionStartTime = performance.now();
    }
  }, [targetColor]);
  const updateTransition = React.useCallback(() => {
    const now = performance.now();
    const elapsed = now - timeRef.current.transitionStartTime;
    transitionRef.current.progress = Math.min(elapsed / transitionDuration, 1);
    if (transitionRef.current.progress >= 1) {
      transitionRef.current.isTransitioning = false;
      transitionRef.current.progress = 1;
    }
  }, [transitionDuration]);
  const getCurrentColor = React.useCallback(() => {
    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }
    updateTransition();
    return interpolateOKLCH.interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress
    );
  }, [updateTransition]);
  const getColorString = React.useCallback(() => {
    const [lightness, chroma, hue] = getCurrentColor();
    return interpolateOKLCH.OKLCHToCSS(lightness, chroma, hue);
  }, [getCurrentColor]);
  const isTransitioning = React.useCallback(() => {
    return transitionRef.current.isTransitioning;
  }, []);
  return {
    getCurrentColor,
    getColorString,
    isTransitioning,
    updateTransition
  };
}

exports.useColorTransition = useColorTransition;
