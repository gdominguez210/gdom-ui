import { useContext } from 'react';
import {
  AUDIO_PLAYER_CONTEXT_TRACK_ERROR,
  AudioPlayerContextTrack,
  type AudioPlayerContextTrackType,
} from './AudioPlayerContextTrack';

export function useAudioPlayerContextTrack(): AudioPlayerContextTrackType {
  const context = useContext(AudioPlayerContextTrack);

  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_TRACK_ERROR);
  }

  return context;
}
