/**
 * Normalizes audio data value to a ratio between -1 and 1
 *
 * Takes a value from the audio data array (0-255) and converts it to
 * a normalized offset from the center point (-1 to 1), where:
 * - 128 → 0 (center)
 * - 0 → -1 (minimum)
 * - 255 → 1 (maximum)
 *
 * @param value - Raw audio data value (0-255)
 * @returns Normalized offset from center (-1 to 1)
 */
export function normalizeAudioValue(value: number): number {
  return (value - 128) / 128;
}

/**
 * Calculates the Y coordinate for a waveform point
 *
 * Maps the normalized audio value to a Y coordinate on the canvas,
 * centered vertically with positive values above center and negative below.
 *
 * @param normalizedValue - Normalized audio value (-1 to 1)
 * @param centerY - Y coordinate of the center line
 * @returns Y coordinate on the canvas
 */
export function calculateWaveformY(normalizedValue: number, centerY: number): number {
  return centerY + normalizedValue * centerY;
}

/**
 * Calculates the amplitude ratio for color mapping
 *
 * Converts a normalized audio value to an absolute amplitude ratio (0-1)
 * used for intensity-based color mapping.
 *
 * @param normalizedValue - Normalized audio value (-1 to 1)
 * @returns Amplitude ratio (0-1)
 */
export function calculateAmplitudeRatio(normalizedValue: number): number {
  return Math.abs(normalizedValue);
}

/**
 * Calculates the position ratio of a segment in the waveform
 *
 * Returns a value from 0-1 representing how far along the segment is
 * in the overall waveform, used for position-based color mapping.
 *
 * @param segmentIndex - Index of the current segment
 * @param totalLength - Total length of the data array
 * @returns Position ratio (0-1)
 */
export function calculatePositionRatio(segmentIndex: number, totalLength: number): number {
  return segmentIndex / totalLength;
}

/**
 * Calculates the optimal segment size based on desired segment count
 *
 * Ensures at least 1 data point per segment while dividing the data
 * into the requested number of segments.
 *
 * @param dataLength - Length of the audio data array
 * @param segmentCount - Desired number of segments
 * @returns Size of each segment (number of data points)
 */
export function calculateSegmentSize(dataLength: number, segmentCount: number): number {
  return Math.max(1, Math.floor(dataLength / segmentCount));
}
