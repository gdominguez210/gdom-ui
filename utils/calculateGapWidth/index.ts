/**
 * Calculates responsive gap width with pixel-based min/max bounds
 * @param displayWidth - The width of the canvas in pixels
 * @param gapPercent - Gap as a percentage (0-100, e.g., 0.5 = 0.5%)
 * @param minGapWidth - Minimum gap width in pixels
 * @param maxGapWidth - Maximum gap width in pixels
 * @returns The calculated gap width in pixels
 */
export function calculateGapWidth(
  displayWidth: number,
  gapPercent: number,
  minGapWidth = 1,
  maxGapWidth?: number,
): number {
  if (minGapWidth <= 0 || gapPercent <= 0 || gapPercent > 100) {
    return 0;
  }

  const gapRatio = gapPercent / 100;

  const desiredGapWidth = displayWidth * gapRatio;

  const gapWithMin = Math.max(minGapWidth, desiredGapWidth);

  return maxGapWidth !== undefined ? Math.min(maxGapWidth, gapWithMin) : gapWithMin;
}
