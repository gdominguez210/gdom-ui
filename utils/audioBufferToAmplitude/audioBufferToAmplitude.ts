import {
  type AmplitudeEnvelopeGenerationOptions,
  generateAmplitudeEnvelopes,
} from '@/utils/generateAmplitudeEnvelopes/generateAmplitudeEnvelopes';

/**
 * Type for amplitude envelope data
 */
export type AmplitudeEnvelopeData = {
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
   * Normalized amplitude values (0-1) for each point in the amplitude envelope
   */
  amplitudeEnvelopes: number[];
};

/**
 * Process an `AudioBuffer` to generate amplitude envelope data
 *
 * @param audioBuffer - Decoded audio buffer
 * @param options - Amplitude envelope generation options
 * @param filename - Original filename (optional)
 * @returns Processed amplitude envelope data
 */
export function audioBufferToAmplitude(
  audioBuffer: AudioBuffer,
  options: AmplitudeEnvelopeGenerationOptions = {},
  filename: string = 'audio-file',
): AmplitudeEnvelopeData {
  const rawData = audioBuffer.getChannelData(0);

  const amplitudeEnvelopes = generateAmplitudeEnvelopes(rawData, options);

  return {
    filename,
    duration: audioBuffer.duration,
    sampleRate: audioBuffer.sampleRate,
    numberOfChannels: audioBuffer.numberOfChannels,
    resolution: options.resolution || 1000,
    amplitudeEnvelopes,
  };
}
