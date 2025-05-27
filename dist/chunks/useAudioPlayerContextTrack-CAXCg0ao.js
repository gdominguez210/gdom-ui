'use strict';

const React = require('react');
const AudioPlayerContextTrack = require('./AudioPlayerContextTrack-CT3OR7Rt.js');

function useAudioPlayerContextTrack() {
  const context = React.useContext(AudioPlayerContextTrack.AudioPlayerContextTrack);
  if (!context) {
    throw new Error(AudioPlayerContextTrack.AUDIO_PLAYER_CONTEXT_TRACK_ERROR);
  }
  return context;
}

exports.useAudioPlayerContextTrack = useAudioPlayerContextTrack;
