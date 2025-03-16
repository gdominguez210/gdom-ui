export const TIME_ACTIONS = {
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
} as const;

export type ActionPayloads = {
  [TIME_ACTIONS.SET_CURRENT_TIME]: { currentTime: number };
  [TIME_ACTIONS.SET_DURATION]: { duration: number };
};

export type TimeAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

export type TimeState = {
  currentTime: number;
  duration: number;
};

export function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case TIME_ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload.currentTime };
    case TIME_ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload.duration };
    default:
      return state;
  }
}
