'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const AudioPlayerContextPlayback = require('./AudioPlayerContextPlayback-DabtEt7O.js');

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
  const [state, dispatch] = React.useReducer(playbackReducer, {
    isPlaying: false,
    volume: defaultVolume,
    mute: defaultMute,
    shuffle: defaultShuffle,
    loop: defaultLoop
  });
  const play = React.useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: true } });
  }, []);
  const pause = React.useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: false } });
  }, []);
  const togglePlay = React.useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_IS_PLAYING, payload: { isPlaying: "toggle" } });
  }, []);
  const setVolume = React.useCallback((volume) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_VOLUME, payload: { volume } });
  }, []);
  const setMute = React.useCallback((mute) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_MUTE, payload: { mute } });
  }, []);
  const toggleMute = React.useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_MUTE, payload: { mute: "toggle" } });
  }, []);
  const setShuffle = React.useCallback((shuffle) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_SHUFFLE, payload: { shuffle } });
  }, []);
  const toggleShuffle = React.useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_SHUFFLE, payload: { shuffle: "toggle" } });
  }, []);
  const setLoop = React.useCallback((loop) => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_LOOP, payload: { loop } });
  }, []);
  const toggleLoop = React.useCallback(() => {
    dispatch({ type: PLAYBACK_ACTIONS.SET_LOOP, payload: { loop: "toggle" } });
  }, []);
  const contextValue = React.useMemo(
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
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlayerContextPlayback.AudioPlayerContextPlayback.Provider, { value: contextValue, children });
}

exports.AudioPlayerContextPlaybackProvider = AudioPlayerContextPlaybackProvider;
