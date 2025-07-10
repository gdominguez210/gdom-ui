/**
 * Scales an amplitude value using linear scaling.
 * Preserves zero values.
 *
 * @param value - Raw amplitude value (-1 to 1)
 * @param minAmplitude - Minimum amplitude value to ensure visibility
 * @returns Scaled amplitude value
 */
export function scaleAmplitudeLinear(value: number, minAmplitude: number = 0.1): number {
  if (value === 0) return 0;

  return Math.sign(value) * Math.max(minAmplitude, Math.abs(value));
}
