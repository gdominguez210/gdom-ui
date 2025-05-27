'use strict';

const React = require('react');
const AudioPlayerContextRefs = require('./AudioPlayerContextRefs-DHqMOcS8.js');

function useAudioPlayerContextRefs() {
  const context = React.useContext(AudioPlayerContextRefs.AudioPlayerContextRefs);
  if (!context) {
    throw new Error(AudioPlayerContextRefs.AUDIO_PLAYER_CONTEXT_REFS_ERROR);
  }
  return context;
}

exports.useAudioPlayerContextRefs = useAudioPlayerContextRefs;
