import { useRef, useCallback, useEffect } from 'react';
import { convertColorToOKLCH } from '@lib/utils/convertColorToOKLCH/convertColorToOKLCH';
import { OKLCHToCSS } from '@lib/utils/OKLCHToCSS/OKLCHtoCSS';

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

export type OKLCHColor = [number, number, number]; // [lightness, chroma, hue]

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

  // Function to interpolate between two OKLCH colors
  const interpolateOKLCH = useCallback(
    (colorA: OKLCHColor, colorB: OKLCHColor, progress: number): OKLCHColor => {
      const [l1, c1, h1] = colorA;
      const [l2, c2, h2] = colorB;

      // Handle hue interpolation correctly (shortest path around the circle)
      let hDiff = h2 - h1;
      if (hDiff > 180) hDiff -= 360;
      if (hDiff < -180) hDiff += 360;

      const interpolatedHue = (h1 + hDiff * progress) % 360;

      return [
        l1 + (l2 - l1) * progress,
        c1 + (c2 - c1) * progress,
        interpolatedHue < 0 ? interpolatedHue + 360 : interpolatedHue,
      ];
    },
    [],
  );

  // Function to update transition progress based on elapsed time
  const updateTransition = useCallback(() => {
    if (!transitionRef.current.isTransitioning) return;

    const now = performance.now();
    const elapsed = now - timeRef.current.transitionStartTime;
    transitionRef.current.progress = Math.min(elapsed / transitionDuration, 1);

    if (transitionRef.current.progress >= 1) {
      transitionRef.current.isTransitioning = false;
      transitionRef.current.progress = 1;
    }
  }, [transitionDuration]);

  // Function to get the current interpolated color in OKLCH format
  const getCurrentColor = useCallback((): OKLCHColor => {
    updateTransition();

    if (!transitionRef.current.isTransitioning) {
      return transitionRef.current.targetOKLCH;
    }

    return interpolateOKLCH(
      transitionRef.current.previousOKLCH,
      transitionRef.current.targetOKLCH,
      transitionRef.current.progress,
    );
  }, [updateTransition, interpolateOKLCH]);

  // Function to convert the current OKLCH color to a CSS string using our utility
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
