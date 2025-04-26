import { OKLCHProperty } from '@lib/types/colors';

/**
 * Configuration for how a specific OKLCH property should react to audio intensity
 */
export type ReactivePropertyConfig = {
  /** The OKLCH property to modify */
  property: (typeof OKLCHProperty)[keyof typeof OKLCHProperty];
  /**
   * Minimum value for this property when intensity is 0 (silent)
   *
   * For lightness: Typically 0-1 (0=black, 1=white)
   * For chroma: Typically 0-0.4 (0=grayscale, higher=more saturated)
   * For hue: 0-360 degrees on the color wheel
   */
  min: number;
  /**
   * Maximum value for this property when intensity is 1 (loudest)
   *
   * The property will be interpolated between min and max based on intensity.
   *
   * Example with min=0.3, max=0.8, intensity=0.6:
   * value = 0.3 + (0.8 - 0.3) * 0.6 = 0.6
   *
   * This positions the value 60% of the way between min and max,
   * corresponding to the 60% audio intensity.
   */
  max: number;
  /**
   * Optional easing function to apply to the intensity value
   *
   * The easing function transforms the linear intensity (0-1) to create
   * non-linear transitions. This can make visualizations feel more natural.
   *
   * For example:
   * - Linear easing (default): f(t) = t
   * - Quadratic ease-in: f(t) = t²
   * - Sine ease-out: f(t) = sin(t * π/2)
   *
   * @defaultValue t => t (linear easing)
   */
  easing?: (t: number) => number;
};

/**
 * Gets a color that reacts to audio intensity by modifying specified OKLCH properties
 *
 * @param baseOklch - The base color in OKLCH format [lightness, chroma, hue]
 * @param intensity - Audio intensity value between 0 and 1
 * @param propertyConfigs - Array of configurations for which properties to modify and how
 * @returns Modified color in OKLCH format as a string
 */
export function getReactiveColor(
  baseOklch: [number, number, number],
  intensity: number,
  propertyConfigs: ReactivePropertyConfig[],
): string {
  // Ensure intensity is between 0 and 1
  const safeIntensity = Math.max(0, Math.min(1, intensity));

  // Extract base OKLCH values
  const [lightness, chroma, hue] = baseOklch;

  // Create a new OKLCH color with modified properties
  let modifiedL = lightness;
  let modifiedC = chroma;
  let modifiedH = hue;

  // Apply each property modification based on intensity
  propertyConfigs.forEach((config) => {
    const { property, min, max, easing = (t: number) => t } = config;

    // Apply easing function to intensity value
    const easedIntensity = easing(safeIntensity);

    // Calculate the new value based on min/max range and intensity
    const newValue = min + (max - min) * easedIntensity;

    switch (property) {
      case OKLCHProperty.LIGHTNESS:
        modifiedL = newValue;
        break;
      case OKLCHProperty.CHROMA:
        modifiedC = newValue;
        break;
      case OKLCHProperty.HUE:
        modifiedH = newValue;
        break;
    }
  });

  const roundedL = Math.round(modifiedL * 1000) / 1000;
  const roundedC = Math.round(modifiedC * 1000) / 1000;
  const roundedH = Math.round(modifiedH);

  return `oklch(${roundedL} ${roundedC} ${roundedH})`;
}
