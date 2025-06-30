import { createContext, useContext } from 'react';

const AUDIO_PLAYLIST_CONTEXT_ERROR = "useAudioPlaylistContext must be used within an AudioPlaylistContextProvider";
const AudioPlaylistContext = createContext(null);

function useAudioPlaylistContext() {
  const context = useContext(AudioPlaylistContext);
  if (!context) {
    throw new Error(AUDIO_PLAYLIST_CONTEXT_ERROR);
  }
  return context;
}

export { AudioPlaylistContext as A, useAudioPlaylistContext as u };
