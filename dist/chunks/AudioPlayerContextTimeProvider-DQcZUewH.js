import { jsx } from 'react/jsx-runtime';
import { useReducer, useCallback, useMemo } from 'react';
import { A as AudioPlayerContextTime } from './AudioPlayerContextTime-qiSCOpNR.js';

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
  const [state, dispatch] = useReducer(timeReducer, {
    currentTime: defaultCurrentTime,
    duration: defaultDuration,
    previewTime: null
  });
  const seek = useCallback((time) => {
    dispatch({ type: TIME_ACTIONS.SET_CURRENT_TIME, payload: { currentTime: time } });
  }, []);
  const setDuration = useCallback((duration) => {
    dispatch({ type: TIME_ACTIONS.SET_DURATION, payload: { duration } });
  }, []);
  const setPreviewTime = useCallback((previewTime) => {
    dispatch({ type: TIME_ACTIONS.SET_PREVIEW_TIME, payload: { previewTime } });
  }, []);
  const contextValue = useMemo(
    () => ({
      ...state,
      seek,
      setDuration,
      setPreviewTime
    }),
    [state, seek, setDuration, setPreviewTime]
  );
  return /* @__PURE__ */ jsx(AudioPlayerContextTime.Provider, { value: contextValue, children });
}

export { AudioPlayerContextTimeProvider as A };
