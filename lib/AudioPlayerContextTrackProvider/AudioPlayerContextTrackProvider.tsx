import { type PropsWithChildren, useReducer, useMemo, useCallback, memo } from 'react';
import { AudioPlayerContextTrack } from './AudioPlayerContextTrack';
import { trackReducer, TRACK_ACTIONS, type AudioTrackData } from './reducer';

export interface AudioPlayerContextTrackProviderProps extends PropsWithChildren {
  tracks: AudioTrackData[];
  defaultTrackIndex?: number;
}

function AudioPlayerContextTrackProvider(props: AudioPlayerContextTrackProviderProps) {
  const { children, tracks, defaultTrackIndex = 0 } = props;

  const [state, dispatch] = useReducer(trackReducer, {
    currentTrackIndex: defaultTrackIndex,
    tracks,
    currentTrack: tracks[defaultTrackIndex],
  });

  const setTrackIndex = useCallback((index: number) => {
    dispatch({
      type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
      payload: { currentTrackIndex: index },
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      setTrackIndex,
    }),
    [state, setTrackIndex],
  );

  return (
    <AudioPlayerContextTrack.Provider value={contextValue}>
      {children}
    </AudioPlayerContextTrack.Provider>
  );
}

const AudioPlayerContextTrackProviderMemo = memo(AudioPlayerContextTrackProvider);
AudioPlayerContextTrackProviderMemo.displayName = 'AudioPlayerContextTrackProvider';
export { AudioPlayerContextTrackProviderMemo as AudioPlayerContextTrackProvider };
