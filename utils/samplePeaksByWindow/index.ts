import type { PeakSegment } from '@/types/audio';

/**
 * Samples waveform data using peak detection over a window size
 * Used when we have more samples than segments (sampleSize > 1)
 */

export function samplePeaksByWindow<T>(
  data: number[],
  numSegments: number,
  sampleSize: number,
  transformFn?: (peakSegment: PeakSegment) => T,
): PeakSegment[] | T[] {
  const result = Array.from({ length: numSegments }, (_, i) => {
    const start = Math.floor(i * sampleSize);
    const end = Math.floor((i + 1) * sampleSize);

    let min = 1;
    let max = -1;

    for (let j = start; j <= end && j < data.length; j++) {
      const value = data[j]!;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }

    return transformFn ? (transformFn({ min, max }) as T) : ({ min, max } as PeakSegment);
  });

  return transformFn ? (result as T[]) : (result as PeakSegment[]);
}
