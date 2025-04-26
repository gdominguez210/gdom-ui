import { useRef, useCallback, useEffect } from 'react';
import { convertColorToOKLCH } from '@lib/utils/convertColorToOKLCH/convertColorToOKLCH';
import { OKLCHToCSS } from '@lib/utils/OKLCHToCSS/OKLCHtoCSS';
import { type OKLCHColor } from '@lib/types/colors';
import { interpolateOKLCH } from '@lib/utils/interpolateOKLCH/interpolateOKLCH';

export type UseColorTransitionOptions = {
  /**
   * The target color as a CSS color string
   */
  targetColor: string;

  /**
   * Duration in milliseconds for color transitions
   * @default 500
   */
  transitionDuration?: number;
};

/**
 * Hook for handling smooth color transitions in OKLCH color space, expected to be used within an animation loop
 *
 * @param options Configuration options for the color transition
 * @returns Object with methods to get the current transitioning color and state
 */
export function useColorTransition(options: UseColorTransitionOptions) {
  const { targetColor, transitionDuration = 500 } = options;

  // Store transition state in a ref to prevent re-renders
  const transitionRef = useRef({
    targetOKLCH: convertColorToOKLCH(targetColor),
    previousOKLCH: convertColorToOKLCH(targetColor),
    isTransitioning: false,
    progress: 1,
    targetColorString: targetColor,
  });

  // Store timestamp for transition tracking
  const timeRef = useRef({
    transitionStartTime: 0,
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

  const getCurrentColor = useCallback((): OKLCHColor => {
    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }

    updateTransition();

    return interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress,
    );
  }, [updateTransition]);

  const getColorString = useCallback((): string => {
    const [lightness, chroma, hue] = getCurrentColor();
    return OKLCHToCSS(lightness, chroma, hue);
  }, [getCurrentColor]);

  // Function to check if a transition is in progress
  const isTransitioning = useCallback((): boolean => {
    return transitionRef.current.isTransitioning;
  }, []);

  return {
    getCurrentColor,
    getColorString,
    isTransitioning,
    updateTransition,
  };
}
