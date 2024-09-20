import { useContext } from 'react';
import { AudioPlayerContext, type AudioPlayerContextType } from './AudioPlayerContextProvider';

function useAudioPlayerContext(): AudioPlayerContextType {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error('useAudioPlayerContext must be used within an AudioPlayerContextProvider');
  }

  return context;
}

export default useAudioPlayerContext;
