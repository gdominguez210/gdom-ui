'use strict';

const React = require('react');

const AUDIO_PLAYER_CONTEXT_TRACK_ERROR = "useAudioPlayerContextTrack must be used within an AudioPlayerContextTrackProvider";
const AudioPlayerContextTrack = React.createContext(null);

exports.AUDIO_PLAYER_CONTEXT_TRACK_ERROR = AUDIO_PLAYER_CONTEXT_TRACK_ERROR;
exports.AudioPlayerContextTrack = AudioPlayerContextTrack;
