import { VISUALIZATION_PARAMS } from '@lib/AudioVisualizerFrequencyBars/visualizationParams';

/**
 * Constants for frequency distribution calculation
 */
export const FREQUENCY_DISTRIBUTION = {
  /**
   * Base value for logarithmic scale (higher = steeper curve)
   */
  LOG_BASE: 1.1,

  /**
   * Exponent multiplier controlling distribution shape
   * Higher values give more emphasis to lower frequencies
   */
  EXPONENT_MULTIPLIER: 19,

  /**
   * Offset value to shift the logarithmic curve to start at zero.
   * Since Math.pow(base, 0) = 1, we subtract 1 to make the curve start at 0.
   */
  ZERO_POINT_OFFSET: 1,
} as const;

/**
 * Calculates the denominator for the logarithmic distribution.
 * This is used to normalize values to the 0-1 range.
 * @returns The denominator for the logarithmic distribution
 */
export function calculateLogarithmicDistributionDenominator() {
  return (
    Math.pow(FREQUENCY_DISTRIBUTION.LOG_BASE, FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER) -
    FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET
  );
}

/**
 * Calculates the ratio of the index to the bar count.
 * Represents where this bar falls in the visual spectrum:
 * - ratio = 0: leftmost bar (lowest frequencies)
 * - ratio = 1: rightmost bar (highest frequencies)
 * This ratio is used to create logarithmic distribution of frequency bands
 * @param index - The index of the bar
 * @param barCount - The total number of bars
 * @returns The ratio of the index to the bar count
 */
export function calculateLogarithmicIndexRatio(index: number, barCount: number) {
  return index / barCount;
}

/**
 * Maps a normalized ratio (0-1) to a logarithmic frequency index.
 *
 * This function creates a logarithmic distribution of frequency data, which
 * more closely matches how humans perceive sound. Lower frequencies are given
 * more visual space, while higher frequencies are compressed.
 *
 * The algorithm:
 * 1. Applies a logarithmic function to the ratio (using LOG_BASE^(EXPONENT_MULTIPLIER*ratio))
 * 2. Shifts the curve to start at zero (subtracts ZERO_POINT_OFFSET)
 * 3. Normalizes to 0-1 range (divides by pre-calculated denominator)
 * 4. Scales to the array index range (multiplies by array length-1)
 * 5. Rounds to the nearest integer index
 *
 * @param ratio - Position in the visual range (0-1, where 0=leftmost, 1=rightmost)
 * @param dataArrayLength - Length of the frequency data array
 * @param denominator - Pre-calculated logarithmic distribution denominator
 * @returns The mapped index in the frequency data array
 */
export function calculateLogarithmicIndex(
  ratio: number,
  dataArrayLength: number,
  denominator: number,
): number {
  return Math.round(
    ((Math.pow(
      FREQUENCY_DISTRIBUTION.LOG_BASE,
      FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER * ratio,
    ) -
      FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET) /
      denominator) *
      (dataArrayLength - 1),
  );
}
/**
 * Amplifies a normalized audio value using a minimum height threshold.
 *
 * This function enhances the visibility of quieter frequencies by:
 * 1. Ensuring a minimum height for all bars (so even silent frequencies have some presence)
 * 2. Scaling the remaining range proportionally to the audio intensity
 *
 * Formula: minHeight + normalizedValue * (MAX_NORMALIZED_VALUE - minHeight)
 *
 * Example:
 * - With minHeight=0.1 and normalizedValue=0 (silence): result=0.1 (10% height)
 * - With minHeight=0.1 and normalizedValue=1 (max): result=1.0 (100% height)
 * - With minHeight=0.1 and normalizedValue=0.5 (half): result=0.55 (55% height)
 *
 * @param normalizedValue - The audio value normalized to 0-1 range
 * @param minHeight - Minimum height threshold (0-1)
 * @returns The amplified value in 0-1 range
 */
export function calculateAmplifiedValue(normalizedValue: number, minHeight: number): number {
  return minHeight + normalizedValue * (VISUALIZATION_PARAMS.MAX_NORMALIZED_VALUE - minHeight);
}
