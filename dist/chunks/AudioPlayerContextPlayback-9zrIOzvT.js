import { createContext } from 'react';

const AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR = "useAudioPlayerContextPlayback must be used within an AudioPlayerContextPlaybackProvider";
const AudioPlayerContextPlayback = createContext(
  null
);

export { AudioPlayerContextPlayback as A, AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR as a };
