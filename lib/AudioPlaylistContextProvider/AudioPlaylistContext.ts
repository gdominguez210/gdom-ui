import { createContext, type RefObject } from 'react';

export const AUDIO_PLAYLIST_CONTEXT_ERROR =
  'useAudioPlaylistContext must be used within an AudioPlaylistContextProvider';

export interface AudioPlaylistContextType {
  isPlaylistVisible: boolean;
  togglePlaylist: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
  dismissRef: RefObject<HTMLButtonElement | null>;
}

export const AudioPlaylistContext = createContext<AudioPlaylistContextType | null>(null);
