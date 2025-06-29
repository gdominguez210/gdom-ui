/**
 * Calculates the optimal segment width based on available space and number of segments
 * Returns integer pixel values to prevent anti-aliasing artifacts
 * @param displayWidth - The width of the canvas in pixels
 * @param segmentCount - The number of segments to display
 * @param minSegmentWidth - The minimum width for each segment in pixels
 * @param gapWidth - The width of gaps between segments in pixels
 * @returns Object with segment width and actual segment count that fits
 */
export function calculateSegmentWidth(
  displayWidth: number,
  segmentCount: number,
  minSegmentWidth: number,
  gapWidth: number = 0,
): { segmentWidth: number; actualSegmentCount: number; remainingPixels: number } {
  const effectiveDisplayWidth = Math.max(0, displayWidth);
  const effectiveSegmentCount = Math.max(1, segmentCount);
  const effectiveMinSegmentWidth = Math.max(1, minSegmentWidth);
  const effectiveGapWidth = Math.max(0, gapWidth);

  // Calculate total width needed for gaps (n-1 gaps for n bars)
  const totalGapWidth = (effectiveSegmentCount - 1) * effectiveGapWidth;
  const availableWidthForBars = effectiveDisplayWidth - totalGapWidth;

  const rawSegmentWidth = availableWidthForBars / effectiveSegmentCount;

  const segmentWidth = Math.max(effectiveMinSegmentWidth, Math.floor(rawSegmentWidth));

  const actualSegmentCount = Math.max(0, Math.floor(availableWidthForBars / segmentWidth));

  const actualGapCount = actualSegmentCount > 0 ? actualSegmentCount - 1 : 0;
  const usedWidth = actualSegmentCount * segmentWidth + actualGapCount * effectiveGapWidth;
  const remainingPixels = effectiveDisplayWidth - usedWidth;

  return {
    segmentWidth,
    actualSegmentCount,
    remainingPixels,
  };
}
