/**
 * Options for waveform generation
 */
export type WaveformGenerationOptions = {
  /**
   * Number of data points to generate
   * @default 1000
   */
  resolution?: number;

  /**
   * If true, normalize all values between -1-1
   * @default true
   */
  normalize?: boolean;
};

/**
 * Generate waveform points from raw audio data
 *
 * @param rawData - Raw audio data
 * @param options - Options for waveform generation
 * @returns Waveform points
 */
export function generateWaveformPoints(
  rawData: Float32Array,
  options: WaveformGenerationOptions = {},
): number[] {
  const { resolution = 1000, normalize = true } = options;
  const blockSize = Math.floor(rawData.length / resolution);
  const waveform: number[] = [];

  for (let i = 0; i < resolution; i++) {
    const startIndex = blockSize * i;
    let sum = 0;
    let count = 0;
    for (let j = 0; j < blockSize; j++) {
      const sampleIndex = startIndex + j;
      if (sampleIndex < rawData.length) {
        sum += rawData[sampleIndex]!;
        count++;
      }
    }
    waveform.push(count > 0 ? sum / count : 0);
  }

  // Optional normalization to [-1, 1]
  if (normalize && waveform.length > 0) {
    const maxAbs = Math.max(...waveform.map(Math.abs));
    if (maxAbs > 0) {
      return waveform.map((v) => v / maxAbs);
    }
  }

  return waveform;
}
