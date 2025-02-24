import { useContext } from 'react';
import {
  AudioPlayerContextDispatch,
  type AudioPlayerContextDispatchType,
} from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';

export function useAudioPlayerContextDispatch(): AudioPlayerContextDispatchType {
  const context = useContext(AudioPlayerContextDispatch);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_ERROR);
  }

  return context;
}
