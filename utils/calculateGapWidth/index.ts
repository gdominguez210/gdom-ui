/**
 * Calculates responsive gap width with pixel-based min/max bounds
 * @param displayWidth - The width of the canvas in pixels
 * @param gapPercent - Gap as a percentage (0-100, e.g., 0.5 = 0.5%)
 * @param gapMinWidth - Minimum gap width in pixels
 * @param gapMaxWidth - Maximum gap width in pixels (0 = no limit)
 * @returns The calculated gap width in pixels
 */
export function calculateGapWidth(
  displayWidth: number,
  gapPercent: number,
  gapMinWidth: number = 1,
  gapMaxWidth: number = 0,
): number {
  if (gapMinWidth <= 0 || gapPercent <= 0 || gapPercent > 100) {
    return 0;
  }

  const gapRatio = gapPercent / 100;
  const desiredGapWidth = displayWidth * gapRatio;
  const effectiveMax = gapMaxWidth || Infinity;

  if (gapMinWidth > effectiveMax) {
    return desiredGapWidth <= effectiveMax ? gapMinWidth : effectiveMax;
  }

  const gapWithMin = Math.max(gapMinWidth, desiredGapWidth);
  return gapMaxWidth === 0 ? gapWithMin : Math.min(effectiveMax, gapWithMin);
}
