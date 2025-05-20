import { useContext } from 'react';
import { A as AudioPlayerContextRefs, a as AUDIO_PLAYER_CONTEXT_REFS_ERROR } from './AudioPlayerContextRefs-xp3NvrV9.js';

function useAudioPlayerContextRefs() {
  const context = useContext(AudioPlayerContextRefs);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_REFS_ERROR);
  }
  return context;
}

export { useAudioPlayerContextRefs as u };
