import { useContext } from 'react';
import { AUDIO_PLAYER_CONTEXT_ERROR } from './data';
import { AudioPlayerContextState } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

export function useAudioPlayerContextState() {
  const context = useContext(AudioPlayerContextState);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
  }

  return context;
}
