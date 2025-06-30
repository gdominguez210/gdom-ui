import { AudioContextType } from './AudioContext';
/**
 * Hook for consuming the AudioContext
 * @throws Will throw an error if used outside of an AudioContextProvider
 */
export declare function useAudioContext(): AudioContextType;
