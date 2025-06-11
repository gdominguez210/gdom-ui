import type { PeakSampleOptions, PeakSegment } from '@/types/audio';
import { getInterpolatedValueCubic } from '@/utils/getInterpolatedValueCubic';

/**
 * Gets interpolated peak value using cubic interpolation
 * @param data - Array of audio samples (expected to be in range [-1, 1])
 * @param exactIndex - Exact index of the sample to interpolate
 * @param options - Options for peak interpolation sampling
 * @returns Object containing min and max values for the segment
 */

export function getInterpolatedPeakCubic(
  data: number[],
  exactIndex: number,
  options?: PeakSampleOptions,
): PeakSegment {
  const { numSamples = 4, oversampleRate = 4 } = options || {};

  const startSample = Math.floor(exactIndex - numSamples / 2);
  const endSample = Math.ceil(exactIndex + numSamples / 2);

  let min = Infinity;
  let max = -Infinity;

  const numSteps = (endSample - startSample) * oversampleRate;

  for (let i = 0; i < numSteps; i++) {
    const t = i / numSteps;
    const pos = startSample + t * (endSample - startSample);

    const value = getInterpolatedValueCubic(data, pos);

    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  return { min, max };
}
