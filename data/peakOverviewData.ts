import { audioData as trackOneAudioData } from '@/data/audio/58730401-c910-4a77-935e-83d71d5d1a52';
import type { EnvelopeSegmentInfo } from '@/types/audio';

export const overViewData: Record<string, EnvelopeSegmentInfo[]> = {
  '58730401-c910-4a77-935e-83d71d5d1a52': trackOneAudioData.data[2].peaks,
};
