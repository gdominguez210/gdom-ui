import { useContext } from 'react';
import { A as AudioPlayerContextPlayback, a as AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR } from './AudioPlayerContextPlayback-9zrIOzvT.js';

function useAudioPlayerContextPlayback() {
  const context = useContext(AudioPlayerContextPlayback);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_PLAYBACK_ERROR);
  }
  return context;
}

export { useAudioPlayerContextPlayback as u };
