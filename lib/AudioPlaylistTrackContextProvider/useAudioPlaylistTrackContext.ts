import { useContext } from 'react';
import {
  AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR,
  AudioPlaylistTrackContext,
  type AudioPlaylistTrackContextType,
} from './AudioPlaylistTrackContext';

/**
 * Hook to access the AudioPlaylistTrack context values and methods
 */
export function useAudioPlaylistTrackContext(): AudioPlaylistTrackContextType {
  const context = useContext(AudioPlaylistTrackContext);

  if (!context) {
    throw new Error(AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR);
  }

  return context;
}
