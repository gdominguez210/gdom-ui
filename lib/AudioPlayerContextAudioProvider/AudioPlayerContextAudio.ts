import { createContext } from 'react';

export const AUDIO_PLAYER_CONTEXT_AUDIO_ERROR =
  'useAudioPlayerContextAudio must be used within an AudioPlayerContextAudioProvider';

export interface AudioPlayerContextAudioType {
  // State
  isPlaying: boolean;
  volume: number;
  mute: boolean;
  shuffle: boolean;
  loop: boolean;

  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setMute: (mute: boolean) => void;
  toggleMute: () => void;
  setShuffle: (shuffle: boolean) => void;
  toggleShuffle: () => void;
  setLoop: (loop: boolean) => void;
  toggleLoop: () => void;
}

export const AudioPlayerContextAudio = createContext<AudioPlayerContextAudioType | null>(null);
