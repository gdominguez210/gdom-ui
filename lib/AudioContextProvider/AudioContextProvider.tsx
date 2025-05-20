import type { PropsWithChildren } from 'react';
import { AudioContext } from './AudioContext';
import { useAudioContextWebAPI } from '@/lib/useAudioContextWebAPI/useAudioContextWebAPI';

// Define props for the provider component
export type AudioContextProviderProps = PropsWithChildren & {
  isPlaying?: boolean;
};
/**
 * Provider component that makes audio analysis data available to its children
 */
export function AudioContextProvider(props: AudioContextProviderProps) {
  const { children, isPlaying = false } = props;

  const contextValue = useAudioContextWebAPI({ isPlaying });

  return <AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>;
}
