import { interpolateOKLCH } from '@/utils/interpolateOKLCH/interpolateOKLCH';
import { OKLCHToCSS } from '@/utils/OKLCHToCSS';
import type { OKLCHColor } from 'types/colors';
import type { WaveformGradientStop } from '@/lib/AudioWaveform/types';
import type { MousePosition } from '@/lib/useMousePositionRef/useMousePositionRef';
import type { ElementDimensions } from '@/lib/useElementDimensions/useElementDimensions';

/**
 * Interpolates between two colors based on a ratio
 *
 * @param barColor - The base color in OKLCH format
 * @param progressColor - The progress color in OKLCH format
 * @param ratio - The interpolation ratio (0-1)
 * @returns CSS color string of the interpolated color
 */
export function getInterpolatedColorString(
  barColor: OKLCHColor,
  progressColor: OKLCHColor,
  ratio: number,
): string {
  const interpolatedColor = interpolateOKLCH(barColor, progressColor, ratio);
  return OKLCHToCSS(...interpolatedColor);
}

/**
 * Generates gradient stops for a waveform bar
 *
 * @param progressColorOKLCH - The progress color in OKLCH format
 * @param progressColorCSS - The progress color as a CSS color string
 * @param lightnessDelta - How much to adjust lightness (positive = lighter, negative = darker)
 * @returns An array of gradient stops
 */
export function generateGradientStops(
  progressColorOKLCH: OKLCHColor,
  progressColorCSS: string,
  lightnessDelta: number = -0.1,
): WaveformGradientStop[] {
  const [l, c, h] = progressColorOKLCH;

  // Apply lightness delta, ensuring we stay in the valid range (0-1)
  const adjustedLightness =
    lightnessDelta > 0 ? Math.min(l + lightnessDelta, 1) : Math.max(l + lightnessDelta, 0);

  const adjustedColor = OKLCHToCSS(adjustedLightness, c, h);

  return [
    { offset: 0, color: adjustedColor },
    { offset: 0.4, color: progressColorCSS },
    { offset: 1, color: progressColorCSS }, // Top of bar
  ];
}

/**
 * Calculates the coverage percentage of a waveform bar by the progress (0-1)
 *
 * @param barInfo - Information about the waveform bar
 * @param progress - Current progress position (0-1)
 * @returns The percentage of the bar covered by progress, or null if not applicable
 */
export function calculateBarCoverage(
  barInfo: { position: number; width: number },
  progress: number,
): number {
  const halfWidth = barInfo.width / 2;
  const barStartPosition = barInfo.position - halfWidth;
  const barEndPosition = barInfo.position + halfWidth;

  // If bar is fully behind the progress
  if (barEndPosition <= progress) {
    return 1;
  }

  // If bar is fully ahead of the progress
  if (barStartPosition >= progress) {
    return 0;
  }

  // Bar is partially covered
  const barWidth = barEndPosition - barStartPosition;
  const coveredWidth = progress - barStartPosition;

  return Math.round((coveredWidth / barWidth) * 1000) / 1000;
}

/**
 * Determines if a bar should have the hover effect applied:
 * - If the hover position is greater than the current progress, bars between progress and hover position get hover color
 * - If the hover position is less than the current progress, bars between hover position and progress get hover color
 * @param barPosition The relative position (value between 0 and 1) of the bar on the waveform
 * @param currentProgress The current playback progress (value between 0 and 1)
 * @param hoverPosition The relative mouse position (value between 0 and 1) on the waveform
 * @returns Whether the bar should have the hover effect applied
 */
export function shouldApplyHoverEffect(
  barPosition: number,
  currentProgress: number,
  hoverPosition: number,
): boolean {
  if (hoverPosition > currentProgress) {
    return barPosition > currentProgress && barPosition < hoverPosition;
  } else if (hoverPosition < currentProgress) {
    return barPosition > hoverPosition && barPosition < currentProgress;
  }

  return false;
}

/**
 * Calculates a normalized hover position (0-1) from mouse position and element dimensions
 * @param mousePosition The current mouse position reference
 * @param dimensions The dimensions of the element
 * @returns Normalized position between 0 and 1, or undefined if data is missing
 */
export function getNormalizedHoverPosition(
  mousePosition: MousePosition | undefined,
  dimensions: ElementDimensions | undefined,
): number | undefined {
  if (
    typeof mousePosition?.offsetX === 'number' &&
    typeof dimensions?.width === 'number' &&
    dimensions.width > 0
  ) {
    return mousePosition.offsetX / dimensions.width;
  }
  return undefined;
}
