import type { AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';
import { createContext } from 'react';
import { type AudioPlayerContextAudioType } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudio';
export const AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR =
  'useAudioPlaylistTrackContext must be used within an AudioPlaylistTrackContextProvider';

export interface AudioPlaylistTrackContextType {
  active: boolean;
  isPlaying: boolean;
  track: AudioTrackData;
  togglePlay: AudioPlayerContextAudioType['togglePlay'];
}

export const AudioPlaylistTrackContext = createContext<AudioPlaylistTrackContextType | null>(null);
