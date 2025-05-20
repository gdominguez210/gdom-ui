import type { WaveformGenerationOptions } from '@/utils/getWaveformData/getWaveformData';
import { generateWaveformPoints } from '@/utils/getWaveformData/getWaveformData';
import type { WaveformData } from '@/utils/processAudioFile/processAudioFile';

/**
 * Process an AudioBuffer to generate waveform data
 *
 * @param audioBuffer - Decoded audio buffer
 * @param options - Waveform generation options
 * @param filename - Original filename (optional)
 * @returns Processed waveform data
 */
export function processAudioBuffer(
  audioBuffer: AudioBuffer,
  options: WaveformGenerationOptions = {},
  filename: string = 'audio-file',
): WaveformData {
  // Get the raw audio data from the first channel (mono or left channel for stereo)
  const rawData = audioBuffer.getChannelData(0);

  // Generate waveform points
  const waveform = generateWaveformPoints(rawData, options);

  // Create and return the waveform data object
  return {
    filename,
    duration: audioBuffer.duration,
    sampleRate: audioBuffer.sampleRate,
    numberOfChannels: audioBuffer.numberOfChannels,
    resolution: options.resolution || 1000,
    waveform,
  };
}
