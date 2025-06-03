/**
 * Options for amplitude envelope generation
 */
export type AmplitudeEnvelopeGenerationOptions = {
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
};

/**
 * Analyzes raw audio data to generate amplitude envelopes
 *
 * @param rawData - Raw audio samples (typically from audioBuffer.getChannelData(0))
 * @param options - Amplitude envelope generation options
 * @returns Array of amplitude values
 */
export function generateAmplitudeEnvelopes(
  rawData: Float32Array,
  options: AmplitudeEnvelopeGenerationOptions = {},
): number[] {
  const { resolution = 1000, normalize = true } = options;

  const blockSize = Math.floor(rawData.length / resolution);
  const waveform: number[] = [];

  for (let i = 0; i < resolution; i++) {
    const startIndex = blockSize * i;
    let maxAmplitude = 0;

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
      return waveform.map((value) => value / maxValue);
    }
  }

  return waveform;
}
