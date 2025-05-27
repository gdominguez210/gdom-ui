'use strict';

const React = require('react');

const AUDIO_PLAYLIST_CONTEXT_ERROR = "useAudioPlaylistContext must be used within an AudioPlaylistContextProvider";
const AudioPlaylistContext = React.createContext(null);

function useAudioPlaylistContext() {
  const context = React.useContext(AudioPlaylistContext);
  if (!context) {
    throw new Error(AUDIO_PLAYLIST_CONTEXT_ERROR);
  }
  return context;
}

exports.AudioPlaylistContext = AudioPlaylistContext;
exports.useAudioPlaylistContext = useAudioPlaylistContext;
