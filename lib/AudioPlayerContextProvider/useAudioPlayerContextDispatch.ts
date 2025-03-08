import { useContext } from 'react';
import { AUDIO_PLAYER_CONTEXT_ERROR } from './data';
import {
  AudioPlayerContextDispatch,
  type AudioPlayerContextDispatchType,
} from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

export function useAudioPlayerContextDispatch(): AudioPlayerContextDispatchType {
  const context = useContext(AudioPlayerContextDispatch);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_ERROR.DISPATCH);
  }

  return context;
}
