import { useContext } from 'react';
import {
  AudioPlayerContextState,
  type AudioPlayerContextStateType,
} from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';

export function useAudioPlayerContextState(): AudioPlayerContextStateType {
  const context = useContext(AudioPlayerContextState);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_ERROR);
  }

  return context;
}
