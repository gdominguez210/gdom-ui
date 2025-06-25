import type { EnvelopeSegment, SampleWindowTransformFn } from '@/types/audio';
import { sampleAudioDataByWindow } from '@/utils/sampleAudioDataByWindow';

/**
 * Samples envelope segment data using window-based envelope detection
 * @param data - Envelope segment data (EnvelopeSegment array)
 * @param numSegments - Number of segments to create
 * @param sampleSize - Size of each sampling window
 * @returns Array of envelope segments
 */
export function sampleEnvelopesByWindow<TResult = EnvelopeSegment>(
  data: EnvelopeSegment[],
  numSegments: number,
  sampleSize: number,
  transformFn?: SampleWindowTransformFn<TResult>,
): TResult[] {
  const getEnvelopeSamplesAtPosition = (pos: number) => {
    const segment = data[pos]!;
    return [segment.min, segment.max];
  };

  return sampleAudioDataByWindow(
    data,
    numSegments,
    sampleSize,
    getEnvelopeSamplesAtPosition,
    transformFn,
  );
}
