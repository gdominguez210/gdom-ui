/**
 * Linear interpolation between two points.
 *
 * The formula is:
 *
 * f(x) = y1 + (y2 - y1) * t
 *
 * where:
 * - y1 is the first value
 * - y2 is the second value
 * - t is the interpolation factor (0-1)
 *
 * This performs a weighted average between two points based on the interpolation factor.
 * When t = 0, the result is y1
 * When t = 1, the result is y2
 * When t is between 0 and 1, the result is a proportional mix of y1 and y2
 *
 * @param y1 - First value
 * @param y2 - Second value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function interpolateLinear(y1: number, y2: number, t: number): number {
  return y1 + (y2 - y1) * t;
}
