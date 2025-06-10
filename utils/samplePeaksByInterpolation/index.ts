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
export function samplePeaksByInterpolation(
  data: number[],
  numSegments: number,
  interpolationFn: InterpolationFn,
  options?: PeakSampleOptions,
): PeakSegment[] {
  return Array.from({ length: numSegments }, (_, i) => {
    const exactIndex = (i * data.length) / numSegments;
    return interpolationFn(data, exactIndex, options);
  });
}
