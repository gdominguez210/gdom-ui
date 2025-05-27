import { OKLCHColor } from 'types/colors';
export declare const FREQUENCY_BARS_COLOR_MODES: {
    readonly STATIC: "static";
    readonly FREQUENCY: "frequency";
    readonly INTENSITY: "intensity";
    readonly SPECTRUM: "spectrum";
    readonly DYNAMIC: "dynamic";
};
/**
 * Types of color modes available for the frequency bars
 */
export type FrequencyBarsColorMode = (typeof FREQUENCY_BARS_COLOR_MODES)[keyof typeof FREQUENCY_BARS_COLOR_MODES];
/**
 * Dynamic color modes (all except 'static')
 */
export type DynamicColorMode = Exclude<FrequencyBarsColorMode, 'static'>;
/**
 * Applies the appropriate color based on the color mode
 *
 * @param currentColor - Current base color in OKLCH format
 * @param colorMode - Color mode to use
 * @param positionRatio - Position ratio (0-1) of the frequency bar
 * @param intensityRatio - Intensity ratio (0-1) of the frequency bar
 * @returns CSS color string to use
 */
export declare function getBarColor(currentColor: OKLCHColor, colorMode: DynamicColorMode, positionRatio: number, intensityRatio: number): string;
