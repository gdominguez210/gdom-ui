import { useRef, useCallback, useState, useMemo } from 'react';
import { convertColorToOKLCH } from '@/utils/convertColorToOKLCH/convertColorToOKLCH';
import { OKLCHToCSS } from '@/utils/OKLCHToCSS/OKLCHtoCSS';
import type { OKLCHColor } from '@/types/colors';
import { interpolateOKLCH } from '@/utils/interpolateOKLCH/interpolateOKLCH';
import { useAnimationFrame } from '@/lib/useAnimationFrame/useAnimationFrame';

export type UseColorTransitionOptions = {
  /**
   * The target color as a CSS color string
   */
  targetColor: string;

  /**
   * Duration in milliseconds for color transitions
   * @default 500
   */
  colorTransitionDuration?: number;

  /**
   * Frame rate for animation
   * @default 60
   */
  frameRate?: number;
};

/**
 * Hook for handling smooth color transitions in OKLCH color space.
 *
 * @param options Configuration options for the color transition
 * @returns Object with methods to get the current transitioning color and state
 */
export function useColorTransition(options: UseColorTransitionOptions) {
  const { targetColor, colorTransitionDuration = 500, frameRate = 60 } = options;

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentColor, setCurrentColor] = useState(targetColor);

  const transitionRef = useRef({
    targetOKLCH: convertColorToOKLCH(targetColor),
    previousOKLCH: convertColorToOKLCH(targetColor),
    isTransitioning: false,
    progress: 1,
    targetColorString: targetColor,
    transitionStartTime: 0,
  });

  const getCurrentColor = useCallback((): OKLCHColor => {
    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }

    return interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress,
    );
  }, []);

  const getColorString = useCallback((): string => {
    const [lightness, chroma, hue] = getCurrentColor();
    return OKLCHToCSS(lightness, chroma, hue);
  }, [getCurrentColor]);

  const getIsTransitioning = useCallback((): boolean => {
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

  const animationDependencies = useMemo(() => {
    return [targetColor, colorTransitionDuration];
  }, [targetColor, colorTransitionDuration]);

  useAnimationFrame({
    isActive: targetColor !== transitionRef.current.targetColorString || isTransitioning,
    callback: updateTransition,
    frameRate,
    dependencies: animationDependencies,
  });

  return {
    getCurrentColor,
    getColorString,
    getIsTransitioning,
    currentColor,
  };
}
