'use client';

import { type PropsWithChildren, useReducer, useMemo, useCallback } from 'react';
import { AudioPlayerContextTime } from './AudioPlayerContextTime';
import { timeReducer, TIME_ACTIONS } from './reducer';

/**
 * Props for the time tracking context provider
 */
export type AudioPlayerContextTimeProviderProps = PropsWithChildren & {
  /** Initial total duration in seconds @default 0 */
  defaultDuration?: number;
  /** Initial playback position in seconds @default 0 */
  defaultCurrentTime?: number;
};

/**
 * Provides context for tracking and controlling audio playback time
 */
export function AudioPlayerContextTimeProvider(props: AudioPlayerContextTimeProviderProps) {
  const { defaultDuration = 0, defaultCurrentTime = 0, children } = props;

  const [state, dispatch] = useReducer(timeReducer, {
    currentTime: defaultCurrentTime,
    duration: defaultDuration,
    previewTime: null,
  });

  const seek = useCallback((time: number) => {
    dispatch({ type: TIME_ACTIONS.SET_CURRENT_TIME, payload: { currentTime: time } });
  }, []);

  const setDuration = useCallback((duration: number) => {
    dispatch({ type: TIME_ACTIONS.SET_DURATION, payload: { duration } });
  }, []);

  const setPreviewTime = useCallback((previewTime: number | null) => {
    dispatch({ type: TIME_ACTIONS.SET_PREVIEW_TIME, payload: { previewTime } });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      seek,
      setDuration,
      setPreviewTime,
    }),
    [state, seek, setDuration, setPreviewTime],
  );

  return (
    <AudioPlayerContextTime.Provider value={contextValue}>
      {children}
    </AudioPlayerContextTime.Provider>
  );
}
