import type { EnvelopeSegment, EnvelopeSampleOptions } from '@/types/audio';
import { getInterpolatedValueLinear } from '@/utils/getInterpolatedValueLinear';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';
import { calculateValidSampleRange } from '@/utils/calculateValidSampleRange';

/**
 * Gets interpolated envelope using linear interpolation for raw audio data
 * @param data - Raw audio data
 * @param exactIndex - Exact index to sample around
 * @param options - Sampling options
 */
export function getInterpolatedEnvelopeLinear(
  data: number[] | Float32Array,
  exactIndex: number,
  options?: EnvelopeSampleOptions,
): EnvelopeSegment {
  if (data.length === 0) {
    return { min: 0, max: 0 };
  }

  const { numSamples = 8, oversampleRate = 8 } = options ?? {};

  const { startSample, endSample } = calculateValidSampleRange(data.length, exactIndex, numSamples);

  const getEnvelopeSamplesAtPosition = (pos: number) => [getInterpolatedValueLinear(data, pos)];

  return findEnvelopeInSampleRange(
    startSample,
    endSample,
    getEnvelopeSamplesAtPosition,
    oversampleRate,
  );
}
