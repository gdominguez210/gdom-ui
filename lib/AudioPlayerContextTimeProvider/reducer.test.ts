import { describe, expect, test } from 'vitest';
import { timeReducer, TIME_ACTIONS, type TimeState } from './reducer';

describe('reducer', () => {
  const initialState: TimeState = {
    currentTime: 0,
    duration: 0,
    previewTime: null,
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

  test('should update previewTime when SET_PREVIEW_TIME action is dispatched', () => {
    const newPreviewTime = 75;
    const action = {
      type: TIME_ACTIONS.SET_PREVIEW_TIME,
      payload: { previewTime: newPreviewTime },
    };

    const result = timeReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      previewTime: newPreviewTime,
    });
  });

  test('should set previewTime to null when SET_PREVIEW_TIME is dispatched with null', () => {
    const stateWithPreviewTime: TimeState = {
      currentTime: 30,
      duration: 100,
      previewTime: 50,
    };

    const action = {
      type: TIME_ACTIONS.SET_PREVIEW_TIME,
      payload: { previewTime: null },
    };

    const result = timeReducer(stateWithPreviewTime, action);

    expect(result).toEqual({
      currentTime: 30,
      duration: 100,
      previewTime: null,
    });
  });

  test('should maintain other state properties when updating currentTime', () => {
    const stateWithValues: TimeState = {
      currentTime: 0,
      duration: 100,
      previewTime: 50,
    };

    const action = {
      type: TIME_ACTIONS.SET_CURRENT_TIME,
      payload: { currentTime: 25 },
    };

    const result = timeReducer(stateWithValues, action);

    expect(result).toEqual({
      currentTime: 25,
      duration: 100,
      previewTime: 50,
    });
  });

  test('should maintain other state properties when updating duration', () => {
    const stateWithValues: TimeState = {
      currentTime: 30,
      duration: 0,
      previewTime: 15,
    };

    const action = {
      type: TIME_ACTIONS.SET_DURATION,
      payload: { duration: 120 },
    };

    const result = timeReducer(stateWithValues, action);

    expect(result).toEqual({
      currentTime: 30,
      duration: 120,
      previewTime: 15,
    });
  });

  test('should maintain other state properties when updating previewTime', () => {
    const stateWithValues: TimeState = {
      currentTime: 30,
      duration: 100,
      previewTime: null,
    };

    const action = {
      type: TIME_ACTIONS.SET_PREVIEW_TIME,
      payload: { previewTime: 45 },
    };

    const result = timeReducer(stateWithValues, action);

    expect(result).toEqual({
      currentTime: 30,
      duration: 100,
      previewTime: 45,
    });
  });
});
