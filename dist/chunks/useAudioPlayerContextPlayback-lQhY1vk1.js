'use strict';

const React = require('react');
const AudioPlayerContextPlayback = require('./AudioPlayerContextPlayback-DabtEt7O.js');

function useAudioPlayerContextPlayback() {
  const context = React.useContext(AudioPlayerContextPlayback.AudioPlayerContextPlayback);
  if (!context) {
    throw new Error(AudioPlayerContextPlayback.AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR);
  }
  return context;
}

exports.useAudioPlayerContextPlayback = useAudioPlayerContextPlayback;
