/**
 * Cubic interpolation between four points.
 *
 * The formula is:
 *
 * f(x) = a0 * x^3 + a1 * x^2 + a2 * x + a3
 *
 * where:
 * - a0 = y3 - y2 - y0 + y1
 * - a1 = y0 - y1 - a0
 * - a2 = y2 - y0
 * - a3 = y1
 *
 * @param y0 - Value at x=0
 * @param y1 - Value at x=1
 * @param y2 - Value at x=2
 * @param y3 - Value at x=3
 * @param mu - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function interpolateCubic(
  y0: number,
  y1: number,
  y2: number,
  y3: number,
  mu: number,
): number {
  const mu2 = mu * mu;
  const a0 = y3 - y2 - y0 + y1;
  const a1 = y0 - y1 - a0;
  const a2 = y2 - y0;
  const a3 = y1;

  return a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;
}
