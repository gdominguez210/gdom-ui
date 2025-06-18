import type { EnvelopeSegment, EnvelopeSampleOptions } from '@/types/audio';
import { getInterpolatedValueLinear } from '@/utils/getInterpolatedValueLinear';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';

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
  const { numSamples = 8, oversampleRate = 8 } = options ?? {};

  const startSample = Math.floor(exactIndex - numSamples / 2);
  const endSample = Math.ceil(exactIndex + numSamples / 2);

  const getEnvelopeSamplesAtPosition = (pos: number) => [getInterpolatedValueLinear(data, pos)];

  return findEnvelopeInSampleRange(
    startSample,
    endSample,
    getEnvelopeSamplesAtPosition,
    oversampleRate,
  );
}
