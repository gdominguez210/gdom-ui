import { createContext } from 'react';
import { type UseAudioContextWebAPIReturn } from '@lib/useAudioContextWebAPI/useAudioContextWebAPI';

export type AudioContextType = UseAudioContextWebAPIReturn;

export const AudioContext = createContext<AudioContextType | null>(null);
