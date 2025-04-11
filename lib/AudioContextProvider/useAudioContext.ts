import { useContext } from 'react';
import { AudioContext, type AudioContextType } from './AudioContext';

/**
 * Hook for consuming the AudioContext
 * @throws Will throw an error if used outside of an AudioContextProvider
 */
export function useAudioContext(): AudioContextType {
  const context = useContext(AudioContext);

  if (context === null) {
    throw new Error('useAudioContext must be used within an AudioContextProvider');
  }

  return context;
}
