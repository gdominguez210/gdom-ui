/**
 * Maximum value for audio data (8-bit)
 */
const MAX_AUDIO_VALUE = 255;

/**
 * Maximum normalized value (represents 100% in the 0-1 scale)
 */
const MAX_NORMALIZED_VALUE = 1;

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
  if (dataArrayLength <= 0) return 0;

  const clampedRatio = Math.max(0, Math.min(1, ratio));

  return Math.round(
    ((Math.pow(
      FREQUENCY_DISTRIBUTION.LOG_BASE,
      FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER * clampedRatio,
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
  const clampedValue = Math.max(0, Math.min(1, normalizedValue));

  if (minHeight >= 1) return 1;

  const result = minHeight + clampedValue * (MAX_NORMALIZED_VALUE - minHeight);

  return Math.round(result * 100) / 100;
}

/**
 * Calculates the average frequency value for a specific frequency band.
 *
 * This function aggregates multiple frequency data points into a single value,
 * creating a "band" or "bar" from the raw frequency data. It works by:
 * 1. Taking a range of indices from the frequency data array
 * 2. Calculating the sum of all values in that range
 * 3. Determining the average value for that frequency band
 *
 * Condenses a potentially large number of frequency data points into a single value,
 * allowing for a more readable visualization.
 *
 * @param dataArray - The raw frequency data array from the analyzer
 * @param startIndex - The starting index in the frequency data array for this band
 * @param endIndex - The ending index in the frequency data array for this band
 * @param maxValue - The maximum possible value in the frequency data (for normalization)
 * @returns An object containing the normalized average value (0-1) and the raw average
 */
export function calculateFrequencyBandAverage(
  dataArray: Uint8Array,
  startIndex: number,
  endIndex: number,
  maxValue: number = MAX_AUDIO_VALUE,
): { normalizedValue: number; rawAverage: number } {
  let sum = 0;
  let sampleCount = 0;

  for (let j = startIndex; j <= endIndex; j++) {
    if (j < dataArray.length) {
      sum += dataArray[j] ?? 0;
      sampleCount++;
    }
  }

  const rawAverage = sampleCount > 0 ? sum / sampleCount : 0;

  const normalizedValue = rawAverage / maxValue;

  return { normalizedValue, rawAverage };
}
