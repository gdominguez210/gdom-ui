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
  const startPos = Math.round(startSample);
  const endPos = Math.round(endSample);

  let min = Infinity;
  let max = -Infinity;

  if (startPos === endPos) {
    const samples = getEnvelopeSamplesAtPosition(startPos);
    for (const value of samples) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    return { min, max };
  }

  if (oversampleRate === 1) {
    for (let i = startPos; i <= endPos; i++) {
      const samples = getEnvelopeSamplesAtPosition(i);
      for (const value of samples) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  } else {
    const numSteps = (endPos - startPos) * oversampleRate;

    for (let i = 0; i <= numSteps; i++) {
      const t = i / numSteps;
      const pos = startPos + t * (endPos - startPos);
      const samples = getEnvelopeSamplesAtPosition(pos);
      for (const value of samples) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  }

  return { min, max };
}
