import { useContext } from 'react';
import {
  AudioPlayerContextPlayback,
  type AudioPlayerContextPlaybackType,
  AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR,
} from './AudioPlayerContextPlayback';

export function useAudioPlayerContextPlayback(): AudioPlayerContextPlaybackType {
  const context = useContext(AudioPlayerContextPlayback);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR);
  }

  return context;
}
