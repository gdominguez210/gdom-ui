/**
 * Scales an amplitude value using cubic root scaling.
 * Preserves the sign while enhancing small values.
 *
 * @param value - Raw amplitude value (-1 to 1)
 * @param minAmplitude - Minimum amplitude value to ensure visibility
 * @returns Scaled amplitude value
 */
export function scaleAmplitudeCubic(value: number, minAmplitude: number = 0.1): number {
  if (value === 0) return 0;

  const scaled = Math.sign(value) * Math.pow(Math.abs(value), 1 / 3);
  return Math.sign(scaled) * Math.max(minAmplitude, Math.abs(scaled));
}
