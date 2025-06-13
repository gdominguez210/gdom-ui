import type { PeakSegment, PeakSampleOptions } from '@/types/audio';

export type InterpolationFn = (
  data: number[],
  exactIndex: number,
  options?: PeakSampleOptions,
) => PeakSegment;

/**
 * Samples waveform data using interpolation
 * @param data - The original waveform data
 * @param numSegments - The number of segments to sample
 * @param interpolationFn - The interpolation function to use
 * @param options - The options for the interpolation function
 * @returns The sampled waveform data
 */
export function samplePeaksByInterpolation<T>(
  data: number[],
  numSegments: number,
  interpolationFn: InterpolationFn,
  options?: PeakSampleOptions & { transformFn?: (peakSegment: PeakSegment) => T },
): PeakSegment[] | T[] {
  const { transformFn, ...restOptions } = options ?? {};

  const result = Array.from({ length: numSegments }, (_, i) => {
    const exactIndex = (i * data.length) / numSegments;
    const peakSegment = interpolationFn(data, exactIndex, restOptions);

    return transformFn ? transformFn(peakSegment) : peakSegment;
  });

  return transformFn ? (result as T[]) : (result as PeakSegment[]);
}
