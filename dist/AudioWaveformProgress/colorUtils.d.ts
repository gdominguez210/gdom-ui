import { GradientStop, OKLCHColor } from 'types/colors';
/**
 * Interpolates between two colors based on a ratio
 *
 * @param barColor - The base color in OKLCH format
 * @param progressColor - The progress color in OKLCH format
 * @param ratio - The interpolation ratio (0-1)
 * @returns CSS color string of the interpolated color
 */
export declare function getInterpolatedColorString(barColor: OKLCHColor, progressColor: OKLCHColor, ratio: number): string;
/**
 * Generates gradient stops for a waveform bar
 *
 * @param progressColorOKLCH - The progress color in OKLCH format
 * @param progressColorCSS - The progress color as a CSS color string
 * @param lightnessDelta - How much to adjust lightness (positive = lighter, negative = darker)
 * @returns An array of gradient stops
 */
export declare function generateGradientStops(progressColorOKLCH: OKLCHColor, progressColorCSS: string, lightnessDelta?: number): GradientStop[];
/**
 * Calculates the coverage percentage of a waveform bar by the progress (0-1)
 *
 * @param barInfo - Information about the waveform bar
 * @param progress - Current progress position (0-1)
 * @returns The percentage of the bar covered by progress, or null if not applicable
 */
export declare function calculateBarCoverage(position: number, width: number, progress: number): number;
/**
 * Determines if a bar should have the hover effect applied:
 * - If the hover position is greater than the current progress, bars between progress and hover position get hover color
 * - If the hover position is less than the current progress, bars between hover position and progress get hover color
 * @param barPosition The relative position (value between 0 and 1) of the bar on the waveform
 * @param currentProgress The current playback progress (value between 0 and 1)
 * @param hoverPosition The relative mouse position (value between 0 and 1) on the waveform
 * @returns Whether the bar should have the hover effect applied
 */
export declare function shouldApplyHoverEffect(barPosition: number, currentProgress: number, hoverPosition: number): boolean;
/**
 * Calculates a normalized hover position (0-1) from mouse position and element dimensions
 * @param mousePosition The current mouse position reference
 * @param dimensions The dimensions of the element
 * @returns Normalized position between 0 and 1, or undefined if data is missing
 */
export declare function getNormalizedHoverPosition(offsetX: number, width: number): number;
