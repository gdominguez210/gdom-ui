import type { EnvelopeSegment } from '@/types/audio';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';

/**
 * Samples envelope segment data using window-based envelope detection
 * @param data - Envelope segment data (EnvelopeSegment array)
 * @param numSegments - Number of segments to create
 * @param sampleSize - Size of each sampling window
 * @param transformFn - Optional transform function for each segment
 */
export function sampleEnvelopesByWindow<T>(
  data: EnvelopeSegment[],
  numSegments: number,
  sampleSize: number,
  transformFn?: (envelope: EnvelopeSegment) => T,
): EnvelopeSegment[] | T[] {
  const getEnvelopeSamplesAtPosition = (pos: number) => {
    const segment = data[pos]!;
    return [segment.min, segment.max];
  };

  const result = Array.from({ length: numSegments }, (_, i) => {
    const start = Math.floor(i * sampleSize);
    const end = Math.min(Math.floor((i + 1) * sampleSize), data.length - 1);

    const envelope = findEnvelopeInSampleRange(start, end, getEnvelopeSamplesAtPosition);

    return transformFn ? transformFn(envelope) : envelope;
  });

  return transformFn ? (result as T[]) : (result as EnvelopeSegment[]);
}
