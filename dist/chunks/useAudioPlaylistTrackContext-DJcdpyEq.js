import { createContext, useContext } from 'react';

const AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR = "useAudioPlaylistTrackContext must be used within an AudioPlaylistTrackContextProvider";
const AudioPlaylistTrackContext = createContext(null);

function useAudioPlaylistTrackContext() {
  const context = useContext(AudioPlaylistTrackContext);
  if (!context) {
    throw new Error(AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR);
  }
  return context;
}

export { AudioPlaylistTrackContext as A, useAudioPlaylistTrackContext as u };
