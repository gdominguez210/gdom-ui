import { useContext } from 'react';
import { A as AudioPlayerContextTrack, a as AUDIO_PLAYER_CONTEXT_TRACK_ERROR } from './AudioPlayerContextTrack-BObv6RET.js';

function useAudioPlayerContextTrack() {
  const context = useContext(AudioPlayerContextTrack);
  if (!context) {
    throw new Error(AUDIO_PLAYER_CONTEXT_TRACK_ERROR);
  }
  return context;
}

export { useAudioPlayerContextTrack as u };
