import {
  type WaveformGenerationOptions,
  generateWaveformPoints,
} from '@/utils/generateWaveformPoints/generateWaveformPoints';

/**
 * Type for waveform data
 */
export type WaveformData = {
  /**
   * Original filename of the processed audio
   */
  filename: string;

  /**
   * Duration of the audio in seconds
   */
  duration: number;

  /**
   * Sample rate of the audio in Hz
   */
  sampleRate: number;

  /**
   * Number of audio channels in the source
   */
  numberOfChannels: number;

  /**
   * Number of data points in the waveform
   */
  resolution: number;

  /**
   * Normalized amplitude values (-1-1) for each point in the waveform
   */
  waveformData: number[];
};

export function audioBufferToWaveform(
  audioBuffer: AudioBuffer,
  options: WaveformGenerationOptions = {},
  filename: string = 'audio-file',
): WaveformData {
  const rawData = audioBuffer.getChannelData(0);

  const waveformData = generateWaveformPoints(rawData, options);

  return {
    filename,
    duration: audioBuffer.duration,
    sampleRate: audioBuffer.sampleRate,
    numberOfChannels: audioBuffer.numberOfChannels,
    resolution: options.resolution || 1000,
    waveformData,
  };
}
