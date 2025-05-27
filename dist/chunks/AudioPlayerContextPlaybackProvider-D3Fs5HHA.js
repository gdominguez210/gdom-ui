import { jsx } from 'react/jsx-runtime';
import { useReducer, useCallback, useMemo } from 'react';
import { A as AudioPlayerContextPlayback } from './AudioPlayerContextPlayback-9zrIOzvT.js';

const PLAYBACK_ACTIONS = {
  SET_IS_PLAYING: "SET_IS_PLAYING",
  SET_VOLUME: "SET_VOLUME",
  SET_MUTE: "SET_MUTE",
  SET_SHUFFLE: "SET_SHUFFLE",
  SET_LOOP: "SET_LOOP"
};
function playbackReducer(state, action) {
  switch (action.type) {
    case PLAYBACK_ACTIONS.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying === "toggle" ? !state.isPlaying : action.payload.isPlaying
      };
    case PLAYBACK_ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    case PLAYBACK_ACTIONS.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute === "toggle" ? !state.mute : action.payload.mute
      };
    case PLAYBACK_ACTIONS.SET_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload.shuffle === "toggle" ? !state.shuffle : action.payload.shuffle
      };
    case PLAYBACK_ACTIONS.SET_LOOP:
      return {
        ...state,
        loop: action.payload.loop === "toggle" ? !state.loop : action.payload.loop
      };
    default:
      return state;
  }
}

function AudioPlayerContextPlaybackProvider(props) {
  const {
    defaultVolume = 50,
    defaultMute = false,
    defaultShuffle = false,
    defaultLoop = false,
    children
  } = props;
  const [state, dispatch] = useReducer(playbackReducer, {
    isPlaying: false,
    volume: defaultVolume,
    mute: defaultMute,
    shuffle: defaultShuffle,
    loop: defaultLoop
  });
  const play = useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: true } });
  }, []);
  const pause = useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: false } });
  }, []);
  const togglePlay = useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: "toggle" } });
  }, []);
  const setVolume = useCallback((volume) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_VOLUME, payload: { volume } });
  }, []);
  const setMute = useCallback((mute) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_MUTE, payload: { mute } });
  }, []);
  const toggleMute = useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_MUTE, payload: { mute: "toggle" } });
  }, []);
  const setShuffle = useCallback((shuffle) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_SHUFFLE, payload: { shuffle } });
  }, []);
  const toggleShuffle = useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_SHUFFLE, payload: { shuffle: "toggle" } });
  }, []);
  const setLoop = useCallback((loop) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_LOOP, payload: { loop } });
  }, []);
  const toggleLoop = useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_LOOP, payload: { loop: "toggle" } });
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
      toggleLoop
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
      toggleLoop
    ]
  );
  return /* @__PURE__ */ jsx(AudioPlayerContextPlayback.Provider, { value: contextValue, children });
}

export { AudioPlayerContextPlaybackProvider as A };
