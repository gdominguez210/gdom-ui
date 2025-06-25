import type { EnvelopeSegment } from '@/types/audio';
import { findEnvelopeInSampleRange } from '@/utils/findEnvelopeInSampleRange';
import type { SampleWindowTransformFn } from '@/types/audio';

/**
 * Sample audio data by window-based envelope detection
 * @param data - The audio data to sample
 * @param numSegments - The number of segments to sample
 * @param sampleSize - Size of each sampling window
 * @param getEnvelopeSamplesAtPosition - Function to get sample values at any position
 * @param transformFn - Transform function for each envelope segment
 * @returns The sampled audio data
 */
export function sampleAudioDataByWindow<
  TData extends ArrayLike<unknown>,
  TResult = EnvelopeSegment,
>(
  data: TData,
  numSegments: number,
  sampleSize: number,
  getEnvelopeSamplesAtPosition: (pos: number) => number[],
  transformFn: SampleWindowTransformFn<TResult> = (envelope) => envelope as TResult,
): TResult[] {
  return Array.from({ length: numSegments }, (_, i) => {
    const start = Math.floor(i * sampleSize);
    const end = Math.min(Math.floor((i + 1) * sampleSize), data.length - 1);

    const envelope = findEnvelopeInSampleRange(start, end, getEnvelopeSamplesAtPosition);

    return transformFn(envelope);
  });
}
