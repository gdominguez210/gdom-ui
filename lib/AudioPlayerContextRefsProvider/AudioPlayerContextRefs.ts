import { createContext, type RefObject } from 'react';

export type AudioPlayerContextRefsType = {
  audioRef: RefObject<HTMLAudioElement | null>;
  progressBarRef: RefObject<HTMLInputElement | null>;
};

export const AudioPlayerContextRefs = createContext<AudioPlayerContextRefsType | undefined>(
  undefined,
);

export const AUDIO_PLAYER_CONTEXT_REFS_ERROR =
  'useAudioPlayerContextRefs must be used within an AudioPlayerContextRefsProvider';
