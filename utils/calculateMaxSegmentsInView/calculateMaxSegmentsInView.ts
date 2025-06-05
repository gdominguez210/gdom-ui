/**
 * Calculates how many segments can be displayed given the available width and minimum sizes
 * @param displayWidth - The width of the canvas in pixels
 * @param minSegmentWidth - The minimum width for each segment in pixels
 * @param gapWidth - The width of gaps between segments in pixels
 * @returns The maximum number of segments that can fit in the display width
 */
export function calculateMaxSegmentsInView(
  displayWidth: number,
  minSegmentWidth: number,
  gapWidth: number = 0,
): number {
  return Math.floor((displayWidth + gapWidth) / (minSegmentWidth + gapWidth));
}
