/**
 * Samples the audio data to fit within the available display width
 * @param audioData - The original audio data
 * @param samplingRate - The rate at which to sample the data (e.g., 2 means take every other point)
 * @returns Sampled audio data array
 */
export function sampleAudioData(audioData: number[], samplingRate: number): number[] {
  if (samplingRate === 1) {
    return audioData; // No sampling needed
  }
  return audioData.filter((_, i) => i % samplingRate === 0);
}
