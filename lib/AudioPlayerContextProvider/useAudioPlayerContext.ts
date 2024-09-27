import { useContext } from 'react';
import { AudioPlayerContext, type AudioPlayerContextType } from './AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from './data';

export function useAudioPlayerContext(): AudioPlayerContextType {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_ERROR);
  }

  return context;
}
