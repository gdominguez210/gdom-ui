export type PeakSegment = {
  min: number;
  max: number;
};

/**
 * Samples waveform data using peak detection over a window size
 * Used when we have more samples than segments (sampleSize > 1)
 */
export function samplePeaksByWindow(
  data: number[],
  numSegments: number,
  sampleSize: number,
): PeakSegment[] {
  const result: PeakSegment[] = [];

  for (let i = 0; i < numSegments; i++) {
    const start = Math.floor(i * sampleSize);
    const end = Math.floor((i + 1) * sampleSize);

    let min = 1;
    let max = -1;

    for (let j = start; j <= end && j < data.length; j++) {
      const value = data[j]!;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }

    result.push({ min, max });
  }

  return result;
}
