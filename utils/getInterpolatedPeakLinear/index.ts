import type { PeakSegment, PeakSampleOptions } from '@/types/audio';
import { interpolateLinear } from '@/utils/interpolateLinear';

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

    const y1 = data[Math.floor(pos)] ?? 0;
    const y2 = data[Math.min(data.length - 1, Math.floor(pos) + 1)] ?? 0;

    const fraction = pos - Math.floor(pos);
    const value = interpolateLinear(y1, y2, fraction);

    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  return { min, max };
}
