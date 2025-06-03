/**
 * Decode an audio file or URL into an AudioBuffer
 *
 * @param audioFileOrUrl - The audio file or URL to decode
 * @returns The decoded audio buffer and filename
 */
export async function decodeAudioFile(
  audioFileOrUrl: File | string,
): Promise<{ audioBuffer: AudioBuffer; filename: string }> {
  const audioContext = new AudioContext();
  try {
    let arrayBuffer: ArrayBuffer;
    let filename: string;

    if (typeof audioFileOrUrl === 'string') {
      const response = await fetch(audioFileOrUrl);
      arrayBuffer = await response.arrayBuffer();
      const url = new URL(audioFileOrUrl);
      filename = url.pathname.split('/').pop() || 'audio-file';
    } else {
      arrayBuffer = await audioFileOrUrl.arrayBuffer();
      filename = audioFileOrUrl.name;
    }

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return { audioBuffer, filename };
  } finally {
    if (audioContext.state !== 'closed') {
      await audioContext.close();
    }
  }
}
