'use strict';

const React = require('react');

const AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR = "useAudioPlayerContextPlayback must be used within an AudioPlayerContextPlaybackProvider";
const AudioPlayerContextPlayback = React.createContext(
  null
);

exports.AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR = AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR;
exports.AudioPlayerContextPlayback = AudioPlayerContextPlayback;
