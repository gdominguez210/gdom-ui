import { describe, expect, test } from 'vitest';
import { timeReducer, TIME_ACTIONS, type TimeState } from './reducer';

describe('reducer', () => {
  const initialState: TimeState = {
    currentTime: 0,
    duration: 0,
  };

  test('should update currentTime when SET_CURRENT_TIME action is dispatched', () => {
    const newTime = 50;
    const action = {
      type: TIME_ACTIONS.SET_CURRENT_TIME,
      payload: { currentTime: newTime },
    };

    const result = timeReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      currentTime: newTime,
    });
  });

  test('should update duration when SET_DURATION action is dispatched', () => {
    const newDuration = 120;
    const action = {
      type: TIME_ACTIONS.SET_DURATION,
      payload: { duration: newDuration },
    };

    const result = timeReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      duration: newDuration,
    });
  });

  test('should maintain other state properties when updating currentTime', () => {
    const stateWithDuration: TimeState = {
      currentTime: 0,
      duration: 100,
    };

    const action = {
      type: TIME_ACTIONS.SET_CURRENT_TIME,
      payload: { currentTime: 50 },
    };

    const result = timeReducer(stateWithDuration, action);

    expect(result).toEqual({
      currentTime: 50,
      duration: 100,
    });
  });

  test('should maintain other state properties when updating duration', () => {
    const stateWithCurrentTime: TimeState = {
      currentTime: 30,
      duration: 0,
    };

    const action = {
      type: TIME_ACTIONS.SET_DURATION,
      payload: { duration: 120 },
    };

    const result = timeReducer(stateWithCurrentTime, action);

    expect(result).toEqual({
      currentTime: 30,
      duration: 120,
    });
  });
});
