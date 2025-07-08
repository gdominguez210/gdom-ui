import type { EnvelopeSegment, ProcessedAudioEnvelopeData } from '@/types/audio';

import trackOneJson from '@/data/audio/58730401-c910-4a77-935e-83d71d5d1a52/overviewData.json';
import trackTwoJson from '@/data/audio/cc26e6a5-ebda-4d56-8bad-8fa27d7a8a1f/overviewData.json';
import trackThreeJson from '@/data/audio/c5b2457d-edd2-42d7-9079-c73c51df2f17/overviewData.json';
import trackFourJson from '@/data/audio/2ba503d0-384e-44cb-83b4-cc15e40e6d73/overviewData.json';
import trackFiveJson from '@/data/audio/2fdedd0d-a05b-4dda-8c8d-09ba8697a50f/overviewData.json';
import trackSixJson from '@/data/audio/4dbdff9c-94b5-4dbc-b3bd-591691207f0b/overviewData.json';

export const track1Peaks = (trackOneJson as ProcessedAudioEnvelopeData).data[0]!.peaks;
export const track2Peaks = (trackTwoJson as ProcessedAudioEnvelopeData).data[0]!.peaks;
export const track3Peaks = (trackThreeJson as ProcessedAudioEnvelopeData).data[0]!.peaks;
export const track4Peaks = (trackFourJson as ProcessedAudioEnvelopeData).data[0]!.peaks;
export const track5Peaks = (trackFiveJson as ProcessedAudioEnvelopeData).data[0]!.peaks;
export const track6Peaks = (trackSixJson as ProcessedAudioEnvelopeData).data[0]!.peaks;

const trackPeaks = {
  '58730401-c910-4a77-935e-83d71d5d1a52': track1Peaks,
  'cc26e6a5-ebda-4d56-8bad-8fa27d7a8a1f': track2Peaks,
  'c5b2457d-edd2-42d7-9079-c73c51df2f17': track3Peaks,
  '2ba503d0-384e-44cb-83b4-cc15e40e6d73': track4Peaks,
  '2fdedd0d-a05b-4dda-8c8d-09ba8697a50f': track5Peaks,
  '4dbdff9c-94b5-4dbc-b3bd-591691207f0b': track6Peaks,
} as const;

export const overViewData: Record<string, EnvelopeSegment[]> = trackPeaks;
