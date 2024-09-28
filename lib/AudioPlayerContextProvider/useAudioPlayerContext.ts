import { useContext } from 'react';
import {
  AudioPlayerContext,
  type AudioPlayerContextType,
} from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';

export function useAudioPlayerContext(): AudioPlayerContextType {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_ERROR);
  }

  return context;
}
