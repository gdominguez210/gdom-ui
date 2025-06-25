import type { SampleWindowTransformFn } from '@/types/audio';
import { sampleAudioDataByWindow } from '@/utils/sampleAudioDataByWindow';

/**
 * Samples raw audio data using window-based envelope detection
 * @param data - Raw audio data (number or Float32 array)
 * @param numSegments - Number of segments to create
 * @param sampleSize - Size of each sampling window
 * @returns Array of envelope segments
 */
export function sampleRawAudioByWindow<TResult = number>(
  data: number[] | Float32Array,
  numSegments: number,
  sampleSize: number,
  transformFn?: SampleWindowTransformFn<TResult>,
): TResult[] {
  const getEnvelopeSamplesAtPosition = (pos: number) => [data[pos]!];

  return sampleAudioDataByWindow(
    data,
    numSegments,
    sampleSize,
    getEnvelopeSamplesAtPosition,
    transformFn,
  );
}
