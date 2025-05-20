import { createContext } from 'react';

const AUDIO_PLAYER_CONTEXT_TRACK_ERROR = "useAudioPlayerContextTrack must be used within an AudioPlayerContextTrackProvider";
const AudioPlayerContextTrack = createContext(null);

export { AudioPlayerContextTrack as A, AUDIO_PLAYER_CONTEXT_TRACK_ERROR as a };
