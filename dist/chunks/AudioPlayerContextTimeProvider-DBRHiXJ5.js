'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const AudioPlayerContextTime = require('./AudioPlayerContextTime-bkV-9uUR.js');

const TIME_ACTIONS = {
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_DURATION: "SET_DURATION",
  SET_PREVIEW_TIME: "SET_PREVIEW_TIME"
};
function timeReducer(state, action) {
  switch (action.type) {
    case TIME_ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload.currentTime };
    case TIME_ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload.duration };
    case TIME_ACTIONS.SET_PREVIEW_TIME:
      return { ...state, previewTime: action.payload.previewTime };
    default:
      return state;
  }
}

function AudioPlayerContextTimeProvider(props) {
  const { defaultDuration = 0, defaultCurrentTime = 0, children } = props;
  const [state, dispatch] = React.useReducer(timeReducer, {
    currentTime: defaultCurrentTime,
    duration: defaultDuration,
    previewTime: null
  });
  const seek = React.useCallback((time) => {
    dispatch({ type: TIME_ACTIONS.SET_CURRENT_TIME, payload: { currentTime: time } });
  }, []);
  const setDuration = React.useCallback((duration) => {
    dispatch({ type: TIME_ACTIONS.SET_DURATION, payload: { duration } });
  }, []);
  const setPreviewTime = React.useCallback((previewTime) => {
    dispatch({ type: TIME_ACTIONS.SET_PREVIEW_TIME, payload: { previewTime } });
  }, []);
  const contextValue = React.useMemo(
    () => ({
      ...state,
      seek,
      setDuration,
      setPreviewTime
    }),
    [state, seek, setDuration, setPreviewTime]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlayerContextTime.AudioPlayerContextTime.Provider, { value: contextValue, children });
}

exports.AudioPlayerContextTimeProvider = AudioPlayerContextTimeProvider;
