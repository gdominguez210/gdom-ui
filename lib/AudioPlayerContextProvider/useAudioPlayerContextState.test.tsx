import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useAudioPlayerContextState } from './useAudioPlayerContextState';
import { AudioPlayerContextProvider } from './AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from './data';
import { trackData } from '@lib/AudioPlayer/data';

describe('useAudioPlayerContextState', () => {
  test('should throw error when used without provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    expect(() => renderHook(() => useAudioPlayerContextState())).toThrow(
      AUDIO_PLAYER_CONTEXT_ERROR.STATE,
    );

    vi.restoreAllMocks();
  });

  test('should return state when used with provider', () => {
    const { result } = renderHook(() => useAudioPlayerContextState(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextProvider tracks={trackData}>{children}</AudioPlayerContextProvider>
      ),
    });

    expect(result.current.currentTrack).toEqual(trackData[0]);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.volume).toBe(50);
    expect(result.current.mute).toBe(false);
    expect(result.current.duration).toBe(0);
    expect(result.current.currentTime).toBe(0);
  });
});
