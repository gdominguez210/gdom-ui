import { useContext } from 'react';
import {
  AUDIO_PLAYER_CONTEXT_REFS_ERROR,
  AudioPlayerContextRefs,
  type AudioPlayerContextRefsType,
} from './AudioPlayerContextRefs';

export function useAudioPlayerContextRefs(): AudioPlayerContextRefsType {
  const context = useContext(AudioPlayerContextRefs);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_REFS_ERROR);
  }

  return context;
}
