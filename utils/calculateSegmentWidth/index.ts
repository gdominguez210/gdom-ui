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
  // Calculate total width needed for gaps (n-1 gaps for n bars)
  const totalGapWidth = (segmentCount - 1) * gapWidth;
  const availableWidthForBars = displayWidth - totalGapWidth;

  const rawSegmentWidth = availableWidthForBars / segmentCount;

  const segmentWidth = Math.max(minSegmentWidth, Math.floor(rawSegmentWidth));

  const actualSegmentCount = Math.floor(availableWidthForBars / segmentWidth);

  const usedWidth = actualSegmentCount * segmentWidth + (actualSegmentCount - 1) * gapWidth;
  const remainingPixels = displayWidth - usedWidth;

  return {
    segmentWidth,
    actualSegmentCount,
    remainingPixels,
  };
}
