import type {
  EnvelopeSegment,
  EnvelopeSampleOptions,
  RawAudioInterpolationFn,
} from '@/types/audio';

/**
 * Samples raw audio data using interpolation
 * @param data - Raw audio data
 * @param numSegments - Number of segments to create
 * @param interpolationFn - Interpolation function to use
 * @param options - Options for interpolation
 */
export function sampleRawAudioByInterpolation<T>(
  data: number[] | Float32Array,
  numSegments: number,
  interpolationFn: RawAudioInterpolationFn,
  options?: EnvelopeSampleOptions & { transformFn?: (envelope: EnvelopeSegment) => T },
): EnvelopeSegment[] | T[] {
  const { transformFn, ...restOptions } = options ?? {};

  const result = Array.from({ length: numSegments }, (_, i) => {
    const exactIndex = (i * data.length) / numSegments;
    const envelope = interpolationFn(data, exactIndex, restOptions);

    return transformFn ? transformFn(envelope) : envelope;
  });

  return transformFn ? (result as T[]) : (result as EnvelopeSegment[]);
}
