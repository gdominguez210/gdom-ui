import { useContext } from 'react';
import {
  AudioPlayerContextAudio,
  type AudioPlayerContextAudioType,
  AUDIO_PLAYER_CONTEXT_AUDIO_ERROR,
} from './AudioPlayerContextAudio';

export function useAudioPlayerContextAudio(): AudioPlayerContextAudioType {
  const context = useContext(AudioPlayerContextAudio);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_AUDIO_ERROR);
  }

  return context;
}
