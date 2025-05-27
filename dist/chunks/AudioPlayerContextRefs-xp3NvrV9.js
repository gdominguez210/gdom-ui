import { createContext } from 'react';

const AudioPlayerContextRefs = createContext(
  void 0
);
const AUDIO_PLAYER_CONTEXT_REFS_ERROR = "useAudioPlayerContextRefs must be used within an AudioPlayerContextRefsProvider";

export { AudioPlayerContextRefs as A, AUDIO_PLAYER_CONTEXT_REFS_ERROR as a };
