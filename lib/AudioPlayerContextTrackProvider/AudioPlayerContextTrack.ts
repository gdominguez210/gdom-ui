import { createContext } from 'react';
import type { AudioTrackData } from './AudioPlayerContextTrackProvider';

export const AUDIO_PLAYER_CONTEXT_TRACK_ERROR =
  'useAudioPlayerContextTrack must be used within an AudioPlayerContextTrackProvider';

export interface AudioPlayerContextTrackType {
  currentTrack: AudioTrackData | undefined;
  currentTrackIndex: number;
  tracks: AudioTrackData[];
  setTrackIndex: (index: number) => void;
}

export const AudioPlayerContextTrack = createContext<AudioPlayerContextTrackType | null>(null);
