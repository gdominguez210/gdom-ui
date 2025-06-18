import type { EnvelopeSegment, EnvelopeSegmentInterpolationFn } from '@/types/audio';

/**
 * Samples envelope segment data using interpolation
 * @param data - Envelope segment data
 * @param numSegments - Number of segments to create
 * @param interpolationFn - Interpolation function to use
 * @param options - Options for interpolation
 */
export function sampleEnvelopesByInterpolation<T>(
  data: EnvelopeSegment[],
  numSegments: number,
  interpolationFn: EnvelopeSegmentInterpolationFn,
  options?: { transformFn?: (envelope: EnvelopeSegment) => T },
): EnvelopeSegment[] | T[] {
  const { transformFn } = options ?? {};

  const result = Array.from({ length: numSegments }, (_, i) => {
    const exactIndex = (i * data.length) / numSegments;
    const envelope = interpolationFn(data, exactIndex);

    return transformFn ? transformFn(envelope) : envelope;
  });

  return transformFn ? (result as T[]) : (result as EnvelopeSegment[]);
}
