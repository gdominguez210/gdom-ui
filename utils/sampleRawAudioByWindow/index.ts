import type { EnvelopeSegment } from '@/types/audio';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';

/**
 * Samples raw audio data using window-based envelope detection
 * @param data - Raw audio data (number array)
 * @param numSegments - Number of segments to create
 * @param sampleSize - Size of each sampling window
 * @param transformFn - Optional transform function for each segment
 */
export function sampleRawAudioByWindow<T>(
  data: number[],
  numSegments: number,
  sampleSize: number,
  transformFn?: (envelope: EnvelopeSegment) => T,
): EnvelopeSegment[] | T[] {
  const getEnvelopeSamplesAtPosition = (pos: number) => [data[pos]!];

  const result = Array.from({ length: numSegments }, (_, i) => {
    const start = Math.floor(i * sampleSize);
    const end = Math.min(Math.floor((i + 1) * sampleSize), data.length - 1);

    const envelope = findEnvelopeInSampleRange(start, end, getEnvelopeSamplesAtPosition);

    return transformFn ? transformFn(envelope) : envelope;
  });

  return transformFn ? (result as T[]) : (result as EnvelopeSegment[]);
}
