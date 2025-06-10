/**
 * Calculates the optimal segment width based on available space and number of segments
 * @param displayWidth - The width of the canvas in pixels
 * @param segmentCount - The number of segments to display
 * @param gapWidth - The width of gaps between segments in pixels
 * @param minSegmentWidth - The minimum width for each segment in pixels
 * @returns The calculated segment width in pixels
 */
export function calculateSegmentWidth(
  displayWidth: number,
  segmentCount: number,
  minSegmentWidth: number,
  gapWidth: number = 0,
): number {
  // Calculate total width needed for gaps (n-1 gaps for n bars)
  const totalGapWidth = (segmentCount - 1) * gapWidth;

  const availableWidthForBars = displayWidth - totalGapWidth;

  return Math.max(minSegmentWidth, availableWidthForBars / segmentCount);
}
