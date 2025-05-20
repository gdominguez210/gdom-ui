import { jsx } from 'react/jsx-runtime';
import { useReducer, useCallback, useMemo } from 'react';
import { A as AudioPlayerContextTrack } from './AudioPlayerContextTrack-BObv6RET.js';

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
  const [state, dispatch] = useReducer(trackReducer, {
    currentTrackIndex: defaultTrackIndex,
    tracks,
    currentTrack: tracks[defaultTrackIndex]
  });
  const setTrackIndex = useCallback((index) => {
    dispatch({
      type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
      payload: { currentTrackIndex: index }
    });
  }, []);
  const contextValue = useMemo(
    () => ({
      ...state,
      setTrackIndex
    }),
    [state, setTrackIndex]
  );
  return /* @__PURE__ */ jsx(AudioPlayerContextTrack.Provider, { value: contextValue, children });
}

export { AudioPlayerContextTrackProvider as A };
