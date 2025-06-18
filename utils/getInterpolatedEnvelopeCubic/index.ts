import type { EnvelopeSampleOptions, EnvelopeSegment } from '@/types/audio';
import { getInterpolatedValueCubic } from '@/utils/getInterpolatedValueCubic';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';

/**
 * Gets interpolated envelope using cubic interpolation for raw audio data
 * @param data - Raw audio data
 * @param exactIndex - Exact index to sample around
 * @param options - Sampling options
 */
export function getInterpolatedEnvelopeCubic(
  data: number[] | Float32Array,
  exactIndex: number,
  options?: EnvelopeSampleOptions,
): EnvelopeSegment {
  const { numSamples = 4, oversampleRate = 4 } = options ?? {};

  const startSample = Math.floor(exactIndex - numSamples / 2);
  const endSample = Math.ceil(exactIndex + numSamples / 2);

  const getEnvelopeSamplesAtPosition = (pos: number) => [getInterpolatedValueCubic(data, pos)];

  return findEnvelopeInSampleRange(
    startSample,
    endSample,
    getEnvelopeSamplesAtPosition,
    oversampleRate,
  );
}
