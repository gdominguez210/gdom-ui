/**
 * Calculates the Euclidean distance between two points in 2D space.
 * @param x1 - The x coordinate of the first point.
 * @param y1 - The y coordinate of the first point.
 * @param x2 - The x coordinate of the second point.
 * @param y2 - The y coordinate of the second point.
 * @returns The distance between the two points.
 */
export function calculateDistanceBetweenPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const horizontalDistance = x2 - x1;
  const verticalDistance = y2 - y1;
  return Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
}

/**
 * Normalizes a distance value by dividing it by a reference length.
 * Useful for expressing a segment's length as a fraction of the total width.
 * @param distance - The distance to normalize.
 * @param referenceLength - The value to normalize against (e.g., display width).
 * @returns The normalized distance (0-1).
 */
export function normalizeDistance(distance: number, referenceLength: number): number {
  return distance / referenceLength;
}

/**
 * Calculates the angle (in radians) between two points, relative to the horizontal axis.
 * @param x1 - The x coordinate of the first point.
 * @param y1 - The y coordinate of the first point.
 * @param x2 - The x coordinate of the second point.
 * @param y2 - The y coordinate of the second point.
 * @returns The angle in radians.
 */
export function calculateAngleBetweenPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Calculates the control points for a cubic Bezier curve between two points,
 * used for smoothing a waveform line.
 * The control points are placed horizontally between the start and end points,
 * offset by the smoothing factor.
 * @param startX - The x coordinate of the start point.
 * @param startY - The y coordinate of the start point.
 * @param endX - The x coordinate of the end point.
 * @param endY - The y coordinate of the end point.
 * @param smoothing - The smoothing factor (0-1), where 0 is no smoothing and 1 is maximum smoothing.
 * @returns An object containing the coordinates of the two control points.
 */
export function calculateBezierControlPoints(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  smoothing: number,
): {
  firstControlPointX: number;
  firstControlPointY: number;
  secondControlPointX: number;
  secondControlPointY: number;
} {
  const segmentWidth = endX - startX;
  return {
    firstControlPointX: startX + segmentWidth * smoothing,
    firstControlPointY: startY,
    secondControlPointX: endX - segmentWidth * smoothing,
    secondControlPointY: endY,
  };
}
