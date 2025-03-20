import { describe, expect, test } from 'vitest';
import { audioReducer, type AudioState, AUDIO_ACTIONS } from './reducer';

describe('audioReducer', () => {
  const initialState: AudioState = {
    isPlaying: false,
    volume: 50,
    mute: false,
    shuffle: false,
    loop: false,
  };

  describe('Play/Pause Actions', () => {
    test('should handle SET_IS_PLAYING with boolean value', () => {
      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_IS_PLAYING,
          payload: { isPlaying: true },
        }),
      ).toEqual({
        ...initialState,
        isPlaying: true,
      });

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_IS_PLAYING,
          payload: { isPlaying: false },
        }),
      ).toEqual({
        ...initialState,
        isPlaying: false,
      });
    });

    test('should handle SET_IS_PLAYING with toggle', () => {
      const playingState = { ...initialState, isPlaying: true };

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_IS_PLAYING,
          payload: { isPlaying: 'toggle' },
        }),
      ).toEqual({
        ...initialState,
        isPlaying: true,
      });

      expect(
        audioReducer(playingState, {
          type: AUDIO_ACTIONS.SET_IS_PLAYING,
          payload: { isPlaying: 'toggle' },
        }),
      ).toEqual({
        ...playingState,
        isPlaying: false,
      });
    });
  });

  describe('Volume Actions', () => {
    test('should handle SET_VOLUME', () => {
      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_VOLUME,
          payload: { volume: 75 },
        }),
      ).toEqual({
        ...initialState,
        volume: 75,
      });
    });

    test('should handle SET_MUTE with boolean value', () => {
      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_MUTE,
          payload: { mute: true },
        }),
      ).toEqual({
        ...initialState,
        mute: true,
      });

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_MUTE,
          payload: { mute: false },
        }),
      ).toEqual({
        ...initialState,
        mute: false,
      });
    });

    test('should handle SET_MUTE with toggle', () => {
      const mutedState = { ...initialState, mute: true };

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_MUTE,
          payload: { mute: 'toggle' },
        }),
      ).toEqual({
        ...initialState,
        mute: true,
      });

      expect(
        audioReducer(mutedState, {
          type: AUDIO_ACTIONS.SET_MUTE,
          payload: { mute: 'toggle' },
        }),
      ).toEqual({
        ...mutedState,
        mute: false,
      });
    });
  });

  describe('Playback Mode Actions', () => {
    test('should handle SET_SHUFFLE with boolean value', () => {
      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_SHUFFLE,
          payload: { shuffle: true },
        }),
      ).toEqual({
        ...initialState,
        shuffle: true,
      });

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_SHUFFLE,
          payload: { shuffle: false },
        }),
      ).toEqual({
        ...initialState,
        shuffle: false,
      });
    });

    test('should handle SET_SHUFFLE with toggle', () => {
      const shuffledState = { ...initialState, shuffle: true };

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_SHUFFLE,
          payload: { shuffle: 'toggle' },
        }),
      ).toEqual({
        ...initialState,
        shuffle: true,
      });

      expect(
        audioReducer(shuffledState, {
          type: AUDIO_ACTIONS.SET_SHUFFLE,
          payload: { shuffle: 'toggle' },
        }),
      ).toEqual({
        ...shuffledState,
        shuffle: false,
      });
    });

    test('should handle SET_LOOP with boolean value', () => {
      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_LOOP,
          payload: { loop: true },
        }),
      ).toEqual({
        ...initialState,
        loop: true,
      });

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_LOOP,
          payload: { loop: false },
        }),
      ).toEqual({
        ...initialState,
        loop: false,
      });
    });

    test('should handle SET_LOOP with toggle', () => {
      const loopedState = { ...initialState, loop: true };

      expect(
        audioReducer(initialState, {
          type: AUDIO_ACTIONS.SET_LOOP,
          payload: { loop: 'toggle' },
        }),
      ).toEqual({
        ...initialState,
        loop: true,
      });

      expect(
        audioReducer(loopedState, {
          type: AUDIO_ACTIONS.SET_LOOP,
          payload: { loop: 'toggle' },
        }),
      ).toEqual({
        ...loopedState,
        loop: false,
      });
    });
  });

  describe('State Independence', () => {
    test('should maintain other state values when updating individual properties', () => {
      const complexState: AudioState = {
        isPlaying: true,
        volume: 75,
        mute: true,
        shuffle: true,
        loop: true,
      };

      // Update playing state
      expect(
        audioReducer(complexState, {
          type: AUDIO_ACTIONS.SET_IS_PLAYING,
          payload: { isPlaying: false },
        }),
      ).toEqual({
        ...complexState,
        isPlaying: false,
      });

      // Update volume
      expect(
        audioReducer(complexState, {
          type: AUDIO_ACTIONS.SET_VOLUME,
          payload: { volume: 25 },
        }),
      ).toEqual({
        ...complexState,
        volume: 25,
      });

      // Update mute
      expect(
        audioReducer(complexState, {
          type: AUDIO_ACTIONS.SET_MUTE,
          payload: { mute: false },
        }),
      ).toEqual({
        ...complexState,
        mute: false,
      });

      // Update shuffle
      expect(
        audioReducer(complexState, {
          type: AUDIO_ACTIONS.SET_SHUFFLE,
          payload: { shuffle: false },
        }),
      ).toEqual({
        ...complexState,
        shuffle: false,
      });

      // Update loop
      expect(
        audioReducer(complexState, {
          type: AUDIO_ACTIONS.SET_LOOP,
          payload: { loop: false },
        }),
      ).toEqual({
        ...complexState,
        loop: false,
      });
    });
  });
});
