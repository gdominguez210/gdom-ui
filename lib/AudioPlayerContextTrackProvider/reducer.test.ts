import { describe, expect, test } from 'vitest';
import { trackReducer, type TrackState, TRACK_ACTIONS } from './reducer';
import { trackData } from '@/lib/AudioPlayer/data';

describe('trackReducer', () => {
  const initialState: TrackState = {
    currentTrackIndex: 0,
    tracks: trackData,
    currentTrack: trackData[0],
  };

  describe('SET_CURRENT_TRACK_INDEX action', () => {
    test('should update currentTrackIndex and currentTrack', () => {
      const newState = trackReducer(initialState, {
        type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
        payload: { currentTrackIndex: 1 },
      });

      expect(newState).toEqual({
        ...initialState,
        currentTrackIndex: 1,
        currentTrack: trackData[1],
      });
    });

    test('should maintain state reference if same index', () => {
      const newState = trackReducer(initialState, {
        type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
        payload: { currentTrackIndex: 0 },
      });

      expect(newState).toEqual(initialState);
      expect(newState.currentTrack).toBe(initialState.currentTrack);
    });

    test('should handle undefined currentTrack when index is out of bounds', () => {
      const newState = trackReducer(initialState, {
        type: TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX,
        payload: { currentTrackIndex: 999 },
      });

      expect(newState).toEqual({
        ...initialState,
        currentTrackIndex: 999,
        currentTrack: undefined,
      });
    });
  });
});
