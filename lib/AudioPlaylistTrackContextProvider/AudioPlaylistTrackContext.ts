import type { AudioTrackData } from '@/lib/AudioPlayerContextTrackProvider/reducer';
import { createContext } from 'react';
export const AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR =
  'useAudioPlaylistTrackContext must be used within an AudioPlaylistTrackContextProvider';

export interface AudioPlaylistTrackContextType {
  active: boolean;
  isPlaying: boolean;
  track: AudioTrackData;
  onSelect: () => void;
}

export const AudioPlaylistTrackContext = createContext<AudioPlaylistTrackContextType | null>(null);
