/**
 * Calculates a valid sample range that stays within array bounds
 * @param dataLength - Length of the data array
 * @param exactIndex - Exact index to sample around
 * @param numSamples - Number of samples to include in the range
 * @returns Object with startSample and endSample indices
 */
export function calculateValidSampleRange(
  dataLength: number,
  exactIndex: number,
  numSamples: number,
): { startSample: number; endSample: number } {
  if (dataLength === 0) {
    return { startSample: 0, endSample: 0 };
  }

  const halfSamples = numSamples / 2;
  const intendedStart = Math.floor(exactIndex - halfSamples);
  const intendedEnd = Math.ceil(exactIndex + halfSamples);

  let startSample = Math.max(0, intendedStart);
  let endSample = Math.min(dataLength - 1, intendedEnd);

  if (startSample > endSample) {
    // If exactIndex is way beyond bounds, use the closest valid range
    if (exactIndex < 0) {
      startSample = 0;
      endSample = Math.min(dataLength - 1, numSamples - 1);
    } else {
      startSample = Math.max(0, dataLength - numSamples);
      endSample = dataLength - 1;
    }
  }

  return { startSample, endSample };
}
