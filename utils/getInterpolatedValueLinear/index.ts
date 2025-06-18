import { interpolateLinear } from '../interpolateLinear';

/**
 * Gets a single interpolated value at an exact position using linear interpolation
 * @param data - Array of audio samples (expected to be in range [-1, 1])
 * @param exactIndex - Exact index/position to interpolate (can be fractional)
 * @returns Single interpolated value at the exact position
 */
export function getInterpolatedValueLinear(
  data: number[] | Float32Array,
  exactIndex: number,
): number {
  const y1 = data[Math.floor(exactIndex)] ?? 0;
  const y2 = data[Math.min(data.length - 1, Math.floor(exactIndex) + 1)] ?? 0;

  const fraction = exactIndex - Math.floor(exactIndex);

  return interpolateLinear(y1, y2, fraction);
}
