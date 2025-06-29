import type { EnvelopeSampleOptions, EnvelopeSegment } from '@/types/audio';
import { getInterpolatedValueCubic } from '@/utils/getInterpolatedValueCubic';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';
import { calculateValidSampleRange } from '@/utils/calculateValidSampleRange';

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
  if (data.length === 0) {
    return { min: 0, max: 0 };
  }

  const { numSamples = 4, oversampleRate = 4 } = options ?? {};

  const { startSample, endSample } = calculateValidSampleRange(data.length, exactIndex, numSamples);

  const getEnvelopeSamplesAtPosition = (pos: number) => [getInterpolatedValueCubic(data, pos)];

  return findEnvelopeInSampleRange(
    startSample,
    endSample,
    getEnvelopeSamplesAtPosition,
    oversampleRate,
  );
}
