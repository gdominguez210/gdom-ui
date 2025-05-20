import { getReactiveColor } from '@/utils/getReactiveColor/getReactiveColor';
import { OKLCHProperty } from '@/types/colors';

/**
 * Generates a full spectrum color based on position
 *
 * Creates a rainbow-like effect across the frequency spectrum,
 * cycling through the entire color wheel from left to right
 *
 * @param baseOklchColor - Base color in OKLCH format
 * @param positionRatio - Position ratio of the bar (0-1, left to right)
 * @returns CSS color string
 */
export function getColorBySpectrum(
  baseOklchColor: [number, number, number],
  positionRatio: number,
): string {
  return getReactiveColor(baseOklchColor, positionRatio, [
    { property: OKLCHProperty.HUE, min: 0, max: 360 },
  ]);
}
