import { type PropsWithChildren, useReducer, useMemo, useCallback } from 'react';
import { AudioPlayerContextTrack } from './AudioPlayerContextTrack';
import { trackReducer, TRACK_ACTIONS } from './reducer';
import type { AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';

/**
 * Props for the track management context provider
 */
export interface AudioPlayerContextTrackProviderProps extends PropsWithChildren {
  /** List of tracks to be played */
  tracks: AudioTrackData[];
  /** Initial track index to play @default 0 */
  defaultTrackIndex?: number;
}

/**
 * Provides context for managing the current track and track list
 */
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
