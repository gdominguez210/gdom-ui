import { useContext } from 'react';
import { A as AudioPlayerContextTime, a as AUDIO_PLAYER_CONTEXT_TIME_ERROR } from './AudioPlayerContextTime-qiSCOpNR.js';

function useAudioPlayerContextTime() {
  const context = useContext(AudioPlayerContextTime);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_TIME_ERROR);
  }
  return context;
}

export { useAudioPlayerContextTime as u };
