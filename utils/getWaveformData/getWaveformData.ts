/**
 * Options for waveform generation
 */
export interface WaveformGenerationOptions {
  /**
   * Number of data points to generate
   * @default 1000
   */
  resolution?: number;

  /**
   * If true, normalize all values between 0-1
   * @default true
   */
  normalize?: boolean;
}

/**
 * Analyzes raw audio data to generate waveform data points
 *
 * @param rawData - Raw audio samples (typically from audioBuffer.getChannelData(0))
 * @param options - Waveform generation options
 * @returns Array of amplitude values
 */
export function generateWaveformPoints(
  rawData: Float32Array,
  options: WaveformGenerationOptions = {},
): number[] {
  const { resolution = 1000, normalize = true } = options;

  // Calculate how many audio samples to include in each waveform point
  const blockSize = Math.floor(rawData.length / resolution);
  const waveform: number[] = [];

  // Generate waveform points by finding peak values in each block
  for (let i = 0; i < resolution; i++) {
    const startIndex = blockSize * i;
    let maxAmplitude = 0;

    // Find the peak amplitude in this block
    for (let j = 0; j < blockSize; j++) {
      const sampleIndex = startIndex + j;
      if (sampleIndex < rawData.length) {
        const absoluteValue = Math.abs(rawData[sampleIndex]!);
        if (absoluteValue > maxAmplitude) {
          maxAmplitude = absoluteValue;
        }
      }
    }

    waveform.push(maxAmplitude);
  }

  // Normalize values between 0 and 1 if requested
  if (normalize && waveform.length > 0) {
    const maxValue = Math.max(...waveform);
    if (maxValue > 0) {
      // Avoid division by zero
      return waveform.map((value) => value / maxValue);
    }
  }

  return waveform;
}
