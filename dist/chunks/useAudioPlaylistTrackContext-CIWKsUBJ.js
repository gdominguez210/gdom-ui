'use strict';

const React = require('react');

const AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR = "useAudioPlaylistTrackContext must be used within an AudioPlaylistTrackContextProvider";
const AudioPlaylistTrackContext = React.createContext(null);

function useAudioPlaylistTrackContext() {
  const context = React.useContext(AudioPlaylistTrackContext);
  if (!context) {
    throw new Error(AUDIO_PLAYLIST_TRACK_CONTEXT_ERROR);
  }
  return context;
}

exports.AudioPlaylistTrackContext = AudioPlaylistTrackContext;
exports.useAudioPlaylistTrackContext = useAudioPlaylistTrackContext;
