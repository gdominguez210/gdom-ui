import { decodeAudioFile } from '@/utils/decodeAudioFile/decodeAudioFile';
import { audioBufferToAmplitude } from '@/utils/audioBufferToAmplitude/audioBufferToAmplitude';
import type { AmplitudeEnvelopeData } from '@/utils/audioBufferToAmplitude/audioBufferToAmplitude';
import type { AmplitudeEnvelopeGenerationOptions } from '@/utils/generateAmplitudeEnvelopes/generateAmplitudeEnvelopes';

/**
 * Process an audio file or URL to generate amplitude envelopes
 *
 * @param audioFileOrUrl - The audio file or URL to process
 * @param options - The options for the amplitude envelope generation
 * @returns The amplitude envelope data
 */
export async function processAudioFileToAmplitude(
  audioFileOrUrl: File | string,
  options: AmplitudeEnvelopeGenerationOptions = {},
): Promise<AmplitudeEnvelopeData> {
  const { audioBuffer, filename } = await decodeAudioFile(audioFileOrUrl);

  return audioBufferToAmplitude(audioBuffer, options, filename);
}
