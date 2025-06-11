import type { PeakSegment, PeakSampleOptions } from '@/types/audio';
import { getInterpolatedValueLinear } from '@/utils/getInterpolatedValueLinear';

/**
 * Gets interpolated peak value using linear interpolation
 * @param data - Array of audio samples (expected to be in range [-1, 1])
 * @param exactIndex - Exact index of the sample to interpolate
 * @param options - Options for peak interpolation sampling
 * @returns Object containing min and max values for the segment
 */

export function getInterpolatedPeakLinear(
  data: number[],
  exactIndex: number,
  options?: PeakSampleOptions,
): PeakSegment {
  const { numSamples = 8, oversampleRate = 8 } = options || {};

  const startSample = Math.floor(exactIndex - numSamples / 2);
  const endSample = Math.ceil(exactIndex + numSamples / 2);

  let min = Infinity;
  let max = -Infinity;

  const numSteps = (endSample - startSample) * oversampleRate;

  for (let i = 0; i < numSteps; i++) {
    const t = i / numSteps;
    const pos = startSample + t * (endSample - startSample);

    const value = getInterpolatedValueLinear(data, pos);

    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  return { min, max };
}
