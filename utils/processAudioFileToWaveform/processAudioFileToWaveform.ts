import { decodeAudioFile } from '@/utils/decodeAudioFile/decodeAudioFile';
import { audioBufferToWaveform } from '@/utils/audioBufferToWaveform/audioBufferToWaveform';
import type { WaveformData } from '@/utils/audioBufferToWaveform/audioBufferToWaveform';
import type { WaveformGenerationOptions } from '@/utils/generateWaveformPoints/generateWaveformPoints';

/**
 * Process an audio file or URL to generate waveform data
 *
 * @param audioFileOrUrl - The audio file or URL to process
 * @param options - The options for the waveform generation
 * @returns The waveform data
 */
export async function processAudioFileToWaveform(
  audioFileOrUrl: File | string,
  options: WaveformGenerationOptions = {},
): Promise<WaveformData> {
  const { audioBuffer, filename } = await decodeAudioFile(audioFileOrUrl);

  return audioBufferToWaveform(audioBuffer, options, filename);
}
