import type { EnvelopeSegment } from '@/types/audio';

export type GetEnvelopeSamplesAtPositionFn = (position: number) => number[];

/**
 * Finds envelope (min/max bounds) in a sample range with optional oversampling
 * @param startSample - Start of the sampling range
 * @param endSample - End of the sampling range
 * @param getEnvelopeSamplesAtPosition - Function to get sample values at any position
 * @param oversampleRate - How many samples per unit (1 = discrete, >1 = interpolated)
 */
export function findEnvelopeInSampleRange(
  startSample: number,
  endSample: number,
  getEnvelopeSamplesAtPosition: GetEnvelopeSamplesAtPositionFn,
  oversampleRate: number = 1,
): EnvelopeSegment {
  let min = Infinity;
  let max = -Infinity;

  if (oversampleRate === 1) {
    for (let i = startSample; i <= endSample; i++) {
      const samples = getEnvelopeSamplesAtPosition(i);
      for (const value of samples) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  } else {
    const numSteps = (endSample - startSample) * oversampleRate;

    for (let i = 0; i < numSteps; i++) {
      const t = i / numSteps;
      const pos = startSample + t * (endSample - startSample);
      const samples = getEnvelopeSamplesAtPosition(pos);
      for (const value of samples) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  }

  return { min, max };
}
