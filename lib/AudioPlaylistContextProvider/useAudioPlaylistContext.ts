import { useContext } from 'react';
import {
  AUDIO_PLAYLIST_CONTEXT_ERROR,
  AudioPlaylistContext,
  type AudioPlaylistContextType,
} from '@/lib/AudioPlaylistContextProvider/AudioPlaylistContext';

/**
 * Hook to access playlist context for managing visibility and references
 */
export function useAudioPlaylistContext(): AudioPlaylistContextType {
  const context = useContext(AudioPlaylistContext);

  if (!context) {
    throw new Error(AUDIO_PLAYLIST_CONTEXT_ERROR);
  }

  return context;
}
