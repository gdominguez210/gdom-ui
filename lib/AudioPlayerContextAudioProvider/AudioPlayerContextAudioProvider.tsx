import { type PropsWithChildren, useReducer, useMemo, useCallback } from 'react';
import { AudioPlayerContextAudio } from './AudioPlayerContextAudio';
import { audioReducer, AUDIO_ACTIONS } from './reducer';

export interface AudioPlayerContextAudioProviderProps extends PropsWithChildren {
  defaultVolume?: number;
  defaultMute?: boolean;
  defaultShuffle?: boolean;
  defaultLoop?: boolean;
}

export function AudioPlayerContextAudioProvider(props: AudioPlayerContextAudioProviderProps) {
  const {
    defaultVolume = 1,
    defaultMute = false,
    defaultShuffle = false,
    defaultLoop = false,
    children,
  } = props;

  const [state, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    volume: defaultVolume,
    mute: defaultMute,
    shuffle: defaultShuffle,
    loop: defaultLoop,
  });

  const play = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: true } });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: false } });
  }, []);

  const togglePlay = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: 'toggle' } });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: AUDIO_ACTIONS.SET_VOLUME, payload: { volume } });
  }, []);

  const setMute = useCallback((mute: boolean) => {
    dispatch({ type: AUDIO_ACTIONS.SET_MUTE, payload: { mute } });
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_MUTE, payload: { mute: 'toggle' } });
  }, []);

  const setShuffle = useCallback((shuffle: boolean) => {
    dispatch({ type: AUDIO_ACTIONS.SET_SHUFFLE, payload: { shuffle } });
  }, []);

  const toggleShuffle = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_SHUFFLE, payload: { shuffle: 'toggle' } });
  }, []);

  const setLoop = useCallback((loop: boolean) => {
    dispatch({ type: AUDIO_ACTIONS.SET_LOOP, payload: { loop } });
  }, []);

  const toggleLoop = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.SET_LOOP, payload: { loop: 'toggle' } });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      play,
      pause,
      togglePlay,
      setVolume,
      setMute,
      toggleMute,
      setShuffle,
      toggleShuffle,
      setLoop,
      toggleLoop,
    }),
    [
      state,
      play,
      pause,
      togglePlay,
      setVolume,
      setMute,
      toggleMute,
      setShuffle,
      toggleShuffle,
      setLoop,
      toggleLoop,
    ],
  );

  return (
    <AudioPlayerContextAudio.Provider value={contextValue}>
      {children}
    </AudioPlayerContextAudio.Provider>
  );
}
