import { getReactiveColor } from '@/utils/getReactiveColor/getReactiveColor';
import { OKLCHProperty } from '@/types/colors';

/**
 * Generates a color by dynamically mapping audio intensity to multiple properties
 *
 * Simultaneously adjusts both lightness and chroma based on audio intensity,
 * creating a more nuanced visual response to sound
 *
 * @param baseOklchColor - Base color in OKLCH format
 * @param intensityRatio - Audio intensity of the bar (0-1, silent to loud)
 * @returns CSS color string
 */
export function getColorByDynamicIntensity(
  baseOklchColor: [number, number, number],
  intensityRatio: number,
): string {
  return getReactiveColor(baseOklchColor, intensityRatio, [
    { property: OKLCHProperty.LIGHTNESS, min: 0.4, max: 0.6 },
    { property: OKLCHProperty.CHROMA, min: 0.2, max: 0.3 },
  ]);
}
