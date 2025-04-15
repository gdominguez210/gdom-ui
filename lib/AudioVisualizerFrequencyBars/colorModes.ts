import { OKLCHProperty } from '@lib/utils/getReactiveColor/getReactiveColor';
import { getReactiveColor } from '@lib/utils/getReactiveColor/getReactiveColor';

/**
 * Generates a color that changes based on frequency position
 *
 * Creates a gradient effect where colors change based on the frequency position,
 * typically from blue (low frequencies) to red (high frequencies)
 *
 * @param baseOklchColor - Base color in OKLCH format
 * @param positionRatio - Position ratio of the bar (0-1, left to right)
 * @returns CSS color string
 */
export function getFrequencyBasedColor(
  baseOklchColor: [number, number, number],
  positionRatio: number,
): string {
  return getReactiveColor(baseOklchColor, positionRatio, [
    { property: OKLCHProperty.HUE, min: 240, max: 0 },
  ]);
}

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
export function getIntensityBasedColor(
  baseOklchColor: [number, number, number],
  intensityRatio: number,
): string {
  return getReactiveColor(baseOklchColor, intensityRatio, [
    { property: OKLCHProperty.LIGHTNESS, min: 0.3, max: 0.7 },
  ]);
}

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
export function getSpectrumColor(
  baseOklchColor: [number, number, number],
  positionRatio: number,
): string {
  return getReactiveColor(baseOklchColor, positionRatio, [
    { property: OKLCHProperty.HUE, min: 0, max: 360 },
  ]);
}

/**
 * Generates a dynamically changing color based on audio intensity
 *
 * Simultaneously adjusts multiple color properties based on audio intensity,
 * creating a more nuanced visual response to sound
 *
 * @param baseOklchColor - Base color in OKLCH format
 * @param intensityRatio - Audio intensity of the bar (0-1, silent to loud)
 * @returns CSS color string
 */
export function getDynamicColor(
  baseOklchColor: [number, number, number],
  intensityRatio: number,
): string {
  return getReactiveColor(baseOklchColor, intensityRatio, [
    { property: OKLCHProperty.LIGHTNESS, min: 0.4, max: 0.6 },
    { property: OKLCHProperty.CHROMA, min: 0.2, max: 0.3 },
  ]);
}
