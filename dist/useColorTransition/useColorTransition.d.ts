import { OKLCHColor } from '../../types/colors';
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
export declare function useColorTransition(options: UseColorTransitionOptions): {
    getCurrentColor: () => OKLCHColor;
    getColorString: () => string;
    getIsTransitioning: () => boolean;
    currentColor: string;
};
