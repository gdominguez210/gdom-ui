'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const AudioPlayerContextTrack = require('./AudioPlayerContextTrack-CT3OR7Rt.js');

const TRACK_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: "SET_CURRENT_TRACK_INDEX"
};
function trackReducer(state, action) {
  switch (action.type) {
    case TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX:
      return {
        ...state,
        currentTrackIndex: action.payload.currentTrackIndex,
        currentTrack: state.tracks[action.payload.currentTrackIndex]
      };
    default:
      return state;
  }
}

function AudioPlayerContextTrackProvider(props) {
  const { children, tracks, defaultTrackIndex = 0 } = props;
  const [state, dispatch] = React.useReducer(trackReducer, {
    currentTrackIndex: defaultTrackIndex,
    tracks,
    currentTrack: tracks[defaultTrackIndex]
  });
  const setTrackIndex = React.useCallback((index) => {
    dispatch({
      type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
      payload: { currentTrackIndex: index }
    });
  }, []);
  const contextValue = React.useMemo(
    () => ({
      ...state,
      setTrackIndex
    }),
    [state, setTrackIndex]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlayerContextTrack.AudioPlayerContextTrack.Provider, { value: contextValue, children });
}

exports.AudioPlayerContextTrackProvider = AudioPlayerContextTrackProvider;
