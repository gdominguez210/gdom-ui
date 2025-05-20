'use strict';

const React = require('react');
const AudioPlayerContextTime = require('./AudioPlayerContextTime-bkV-9uUR.js');

function useAudioPlayerContextTime() {
  const context = React.useContext(AudioPlayerContextTime.AudioPlayerContextTime);
  if (!context) {
    throw new Error(AudioPlayerContextTime.AUDIO_PLAYER_CONTEXT_TIME_ERROR);
  }
  return context;
}

exports.useAudioPlayerContextTime = useAudioPlayerContextTime;
