import { useContext } from 'react';
import { A as AudioContext } from './AudioContext-BrfuF5ql.js';

function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error("useAudioContext must be used within an AudioContextProvider");
  }
  return context;
}

export { useAudioContext as u };
