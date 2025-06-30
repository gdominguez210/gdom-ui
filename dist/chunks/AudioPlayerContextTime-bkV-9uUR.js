'use strict';

const React = require('react');

const AUDIO_PLAYER_CONTEXT_TIME_ERROR = "useAudioPlayerContextTime must be used within an AudioPlayerContextTimeProvider";
const AudioPlayerContextTime = React.createContext(null);

exports.AUDIO_PLAYER_CONTEXT_TIME_ERROR = AUDIO_PLAYER_CONTEXT_TIME_ERROR;
exports.AudioPlayerContextTime = AudioPlayerContextTime;
