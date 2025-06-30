import { createContext, type ComponentRef } from 'react';

export type AudioPlayerContextRefsType = {
  audioRef: ComponentRef<'audio'>;
  progressBarRef: ComponentRef<'input'>;
};

export const AudioPlayerContextRefs = createContext<AudioPlayerContextRefsType | undefined>(
  undefined,
);

export const AUDIO_PLAYER_CONTEXT_REFS_ERROR =
  'useAudioPlayerContextRefs must be used within an AudioPlayerContextRefsProvider';
