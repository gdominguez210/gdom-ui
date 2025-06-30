'use strict';

const React = require('react');

const AudioPlayerContextRefs = React.createContext(
  void 0
);
const AUDIO_PLAYER_CONTEXT_REFS_ERROR = "useAudioPlayerContextRefs must be used within an AudioPlayerContextRefsProvider";

exports.AUDIO_PLAYER_CONTEXT_REFS_ERROR = AUDIO_PLAYER_CONTEXT_REFS_ERROR;
exports.AudioPlayerContextRefs = AudioPlayerContextRefs;
