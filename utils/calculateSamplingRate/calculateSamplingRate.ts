/**
 * Determines if data sampling is needed and calculates the sampling rate
 * @param dataLength - The length of the original waveform data array
 * @param maxSegmentsInView - The maximum number of segments that can fit in the display
 * @returns The sampling rate to use (1 means use all data points)
 */
export function calculateSamplingRate(dataLength: number, maxSegmentsInView: number): number {
  if (dataLength <= maxSegmentsInView) {
    return 1; // No sampling needed
  }
  return Math.ceil(dataLength / maxSegmentsInView);
}
