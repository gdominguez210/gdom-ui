import { createContext } from 'react';

const AUDIO_PLAYER_CONTEXT_TIME_ERROR = "useAudioPlayerContextTime must be used within an AudioPlayerContextTimeProvider";
const AudioPlayerContextTime = createContext(null);

export { AudioPlayerContextTime as A, AUDIO_PLAYER_CONTEXT_TIME_ERROR as a };
