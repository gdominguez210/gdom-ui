import { createContext } from 'react';

export const AUDIO_PLAYER_CONTEXT_TIME_ERROR =
  'useAudioPlayerContextTime must be used within an AudioPlayerContextTimeProvider';

export interface AudioPlayerContextTimeType {
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
  setDuration: (duration: number) => void;
}

export const AudioPlayerContextTime = createContext<AudioPlayerContextTimeType | null>(null);
