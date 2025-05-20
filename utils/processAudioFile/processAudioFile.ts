import type { WaveformGenerationOptions } from '@/utils/getWaveformData/getWaveformData';
import { processAudioBuffer } from '@/utils/processAudioBuffer/processAudioBuffer';

/**
 * Interface for waveform data
 */
export interface WaveformData {
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
   * Normalized amplitude values (0-1) for each point in the waveform
   */
  waveform: number[];
}

/**
 * Process an audio file to generate waveform data
 *
 * @param audioFileOrUrl - File object or URL string of the audio to process
 * @param options - Waveform generation options
 * @returns Promise resolving to the waveform data
 */
export async function processAudioFile(
  audioFileOrUrl: File | string,
  options: WaveformGenerationOptions = {},
): Promise<WaveformData> {
  const audioContext = new AudioContext();

  try {
    // Get array buffer from file or URL
    let arrayBuffer: ArrayBuffer;
    let filename: string;

    if (typeof audioFileOrUrl === 'string') {
      // It's a URL
      const response = await fetch(audioFileOrUrl);
      arrayBuffer = await response.arrayBuffer();

      // Extract filename from URL
      const url = new URL(audioFileOrUrl);
      filename = url.pathname.split('/').pop() || 'audio-file';
    } else {
      // It's a File object
      arrayBuffer = await audioFileOrUrl.arrayBuffer();
      filename = audioFileOrUrl.name;
    }

    // Decode the audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Process the audio buffer
    const waveformData = processAudioBuffer(audioBuffer, options, filename);

    return waveformData;
  } finally {
    // Close the audio context when done
    if (audioContext.state !== 'closed') {
      await audioContext.close();
    }
  }
}
