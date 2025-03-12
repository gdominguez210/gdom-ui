import { type PropsWithChildren, useReducer, useMemo, useCallback } from 'react';
import { AudioPlayerContextTrack } from './AudioPlayerContextTrack';

export type AudioTrackData = {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
};

export type TrackProviderState = {
  currentTrackIndex: number;
  tracks: AudioTrackData[];
  currentTrack: AudioTrackData | undefined;
};

export type TrackProviderActions = {
  setTrackIndex: (index: number) => void;
};

const TRACK_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: 'SET_CURRENT_TRACK_INDEX',
} as const;

type ActionPayloads = {
  [TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX]: { currentTrackIndex: number };
};

type TrackProviderAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

function trackReducer(state: TrackProviderState, action: TrackProviderAction): TrackProviderState {
  switch (action.type) {
    case TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX:
      return {
        ...state,
        currentTrackIndex: action.payload.currentTrackIndex,
        currentTrack: state.tracks[action.payload.currentTrackIndex],
      };
    default:
      return state;
  }
}

export interface AudioPlayerContextTrackProviderProps extends PropsWithChildren {
  tracks: AudioTrackData[];
  defaultTrackIndex?: number;
}

export function AudioPlayerContextTrackProvider(props: AudioPlayerContextTrackProviderProps) {
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
