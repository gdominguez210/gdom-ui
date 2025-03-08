import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useAudioPlayerContextDispatch } from './useAudioPlayerContextDispatch';
import { AudioPlayerContextProvider } from './AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from './data';
import { trackData } from '@lib/AudioPlayer/data';
import { AUDIO_PLAYER_ACTIONS } from './data';

describe('useAudioPlayerContextDispatch', () => {
  test('should throw error when used without provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    expect(() => renderHook(() => useAudioPlayerContextDispatch())).toThrow(
      AUDIO_PLAYER_CONTEXT_ERROR.DISPATCH,
    );

    vi.restoreAllMocks();
  });

  test('should return dispatch and actions when used with provider', () => {
    const { result } = renderHook(() => useAudioPlayerContextDispatch(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextProvider tracks={trackData}>{children}</AudioPlayerContextProvider>
      ),
    });

    expect(result.current.dispatch).toBeTypeOf('function');
    expect(result.current.actions).toEqual(AUDIO_PLAYER_ACTIONS);
  });
});
