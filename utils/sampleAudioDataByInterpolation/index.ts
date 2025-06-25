/**
 * Sample audio data by interpolation
 * @param data - The audio data to sample
 * @param numSegments - The number of segments to sample
 * @param interpolationFn - The interpolation function to use
 * @returns The sampled audio data
 */
export function sampleAudioDataByInterpolation<TData extends ArrayLike<unknown>, TResult>(
  data: TData,
  numSegments: number,
  interpolationFn: (data: TData, exactIndex: number) => TResult,
): TResult[] {
  return Array.from({ length: numSegments }, (_, i) => {
    const exactIndex = (i * data.length) / numSegments;
    return interpolationFn(data, exactIndex);
  });
}
