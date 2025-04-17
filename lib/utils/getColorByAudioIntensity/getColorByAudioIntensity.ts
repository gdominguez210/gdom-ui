import { getReactiveColor, OKLCHProperty } from '@lib/utils/getReactiveColor/getReactiveColor';

/**
 * Generates a color that changes based on audio intensity
 *
 * Adjusts brightness based on audio intensity, creating a visual
 * representation of loudness where louder frequencies appear brighter
 *
 * @param baseOklchColor - Base color in OKLCH format
 * @param intensityRatio - Audio intensity of the bar (0-1, silent to loud)
 * @returns CSS color string
 */
export function getColorByAudioIntensity(
  baseOklchColor: [number, number, number],
  intensityRatio: number,
): string {
  return getReactiveColor(baseOklchColor, intensityRatio, [
    { property: OKLCHProperty.LIGHTNESS, min: 0.3, max: 0.7 },
  ]);
}
