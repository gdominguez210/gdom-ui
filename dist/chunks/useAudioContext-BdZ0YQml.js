'use strict';

const React = require('react');
const AudioContext = require('./AudioContext-vMYKRZEV.js');

function useAudioContext() {
  const context = React.useContext(AudioContext.AudioContext);
  if (context === null) {
    throw new Error("useAudioContext must be used within an AudioContextProvider");
  }
  return context;
}

exports.useAudioContext = useAudioContext;
