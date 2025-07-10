/**
 * Scales an amplitude value using logarithmic (dB) scaling.
 * Similar to how audio meters work.
 * Preserves zero values.
 *
 * @param value - Raw amplitude value (-1 to 1)
 * @param minDecibels - Minimum dB level (typically -60)
 * @param minAmplitude - Minimum amplitude value to ensure visibility
 * @returns Scaled amplitude value
 */
export function scaleAmplitudeLogarithmic(
  value: number,
  minDecibels: number = -60,
  minAmplitude: number = 0.1,
): number {
  if (value === 0) return 0;

  const db = 20 * Math.log10(Math.abs(value) + 1e-6);
  const normalized = Math.max(0, (db - minDecibels) / Math.abs(minDecibels));
  return Math.sign(value) * Math.max(minAmplitude, normalized);
}
