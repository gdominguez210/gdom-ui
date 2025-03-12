import { type PropsWithChildren, useReducer, useMemo, useCallback } from 'react';
import { AudioPlayerContextAudio } from './AudioPlayerContextAudio';

const CONTROLS_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: 'SET_CURRENT_TRACK_INDEX',
  SET_VOLUME: 'SET_VOLUME',
  SET_MUTE: 'SET_MUTE',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_SHUFFLE: 'SET_SHUFFLE',
  SET_LOOP: 'SET_LOOP',
} as const;

export type AudioState = {
  isPlaying: boolean;
  volume: number;
  mute: boolean;
  shuffle: boolean;
  loop: boolean;
};

export type AudioActions = {
  // Playback
  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  // Volume
  setVolume: (volume: number) => void;
  setMute: (mute: boolean) => void;
  toggleMute: () => void;

  // Playback Mode
  setShuffle: (shuffle: boolean) => void;
  toggleShuffle: () => void;
  setLoop: (loop: boolean) => void;
  toggleLoop: () => void;
};

type ActionPayloads = {
  [CONTROLS_ACTIONS.SET_VOLUME]: { volume: number };
  [CONTROLS_ACTIONS.SET_MUTE]: { mute: boolean | 'toggle' };
  [CONTROLS_ACTIONS.SET_IS_PLAYING]: { isPlaying: boolean | 'toggle' };
  [CONTROLS_ACTIONS.SET_SHUFFLE]: { shuffle: boolean | 'toggle' };
  [CONTROLS_ACTIONS.SET_LOOP]: { loop: boolean | 'toggle' };
};

type AudioAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case CONTROLS_ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    case CONTROLS_ACTIONS.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute === 'toggle' ? !state.mute : action.payload.mute,
      };
    case CONTROLS_ACTIONS.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying:
          action.payload.isPlaying === 'toggle' ? !state.isPlaying : action.payload.isPlaying,
      };
    case CONTROLS_ACTIONS.SET_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload.shuffle === 'toggle' ? !state.shuffle : action.payload.shuffle,
      };
    case CONTROLS_ACTIONS.SET_LOOP:
      return {
        ...state,
        loop: action.payload.loop === 'toggle' ? !state.loop : action.payload.loop,
      };
    default:
      return state;
  }
}

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
    dispatch({ type: CONTROLS_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: true } });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: CONTROLS_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: false } });
  }, []);

  const togglePlay = useCallback(() => {
    dispatch({ type: CONTROLS_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: 'toggle' } });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: CONTROLS_ACTIONS.SET_VOLUME, payload: { volume } });
  }, []);

  const setMute = useCallback((mute: boolean) => {
    dispatch({ type: CONTROLS_ACTIONS.SET_MUTE, payload: { mute } });
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: CONTROLS_ACTIONS.SET_MUTE, payload: { mute: 'toggle' } });
  }, []);

  const setShuffle = useCallback((shuffle: boolean) => {
    dispatch({ type: CONTROLS_ACTIONS.SET_SHUFFLE, payload: { shuffle } });
  }, []);

  const toggleShuffle = useCallback(() => {
    dispatch({ type: CONTROLS_ACTIONS.SET_SHUFFLE, payload: { shuffle: 'toggle' } });
  }, []);

  const setLoop = useCallback((loop: boolean) => {
    dispatch({ type: CONTROLS_ACTIONS.SET_LOOP, payload: { loop } });
  }, []);

  const toggleLoop = useCallback(() => {
    dispatch({ type: CONTROLS_ACTIONS.SET_LOOP, payload: { loop: 'toggle' } });
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
