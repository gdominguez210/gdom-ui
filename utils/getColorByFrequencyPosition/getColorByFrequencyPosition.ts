import { getReactiveColor } from '@/utils/getReactiveColor/getReactiveColor';
import { OKLCHProperty } from '@/types/colors';

/**
 * Generates a color that changes based on frequency position
 *
 * Creates a gradient effect where colors transition counterclockwise on the color wheel
 * from blue (240°) for low frequencies to red (0°) for high frequencies.
 *
 * The min value (240) is intentionally higher than the max value (0) to create
 * this specific blue → purple → red transition, following the conventional
 * "cool to hot" color mapping for audio frequencies.
 *
 * @param baseOklchColor - Base color in OKLCH format
 * @param positionRatio - Position ratio of the bar (0-1, left to right)
 * @returns CSS color string
 */
export function getColorByFrequencyPosition(
  baseOklchColor: [number, number, number],
  positionRatio: number,
): string {
  return getReactiveColor(baseOklchColor, positionRatio, [
    { property: OKLCHProperty.HUE, min: 240, max: 0 },
  ]);
}
