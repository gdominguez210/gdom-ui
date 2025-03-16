import { type PropsWithChildren, useReducer, useMemo, useCallback } from 'react';
import { AudioPlayerContextTime } from './AudioPlayerContextTime';
import { timeReducer, TIME_ACTIONS } from './reducer';

type ActionPayloads = {
  [TIME_ACTIONS.SET_CURRENT_TIME]: { currentTime: number };
  [TIME_ACTIONS.SET_DURATION]: { duration: number };
};

type TimeAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

type TimeState = {
  currentTime: number;
  duration: number;
};

export interface AudioPlayerContextTimeProviderProps extends PropsWithChildren {
  defaultDuration?: number;
  defaultCurrentTime?: number;
}

export function AudioPlayerContextTimeProvider(props: AudioPlayerContextTimeProviderProps) {
  const { defaultDuration = 0, defaultCurrentTime = 0, children } = props;

  const [state, dispatch] = useReducer(timeReducer, {
    currentTime: defaultCurrentTime,
    duration: defaultDuration,
  });

  const seek = useCallback((time: number) => {
    dispatch({ type: TIME_ACTIONS.SET_CURRENT_TIME, payload: { currentTime: time } });
  }, []);

  const setDuration = useCallback((duration: number) => {
    dispatch({ type: TIME_ACTIONS.SET_DURATION, payload: { duration } });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      seek,
      setDuration,
    }),
    [state, seek, setDuration],
  );

  return (
    <AudioPlayerContextTime.Provider value={contextValue}>
      {children}
    </AudioPlayerContextTime.Provider>
  );
}
