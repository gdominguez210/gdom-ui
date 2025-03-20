import { useContext } from 'react';
import {
  AUDIO_PLAYER_CONTEXT_TIME_ERROR,
  AudioPlayerContextTime,
  type AudioPlayerContextTimeType,
} from './AudioPlayerContextTime';

export function useAudioPlayerContextTime(): AudioPlayerContextTimeType {
  const context = useContext(AudioPlayerContextTime);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_TIME_ERROR);
  }

  return context;
}
