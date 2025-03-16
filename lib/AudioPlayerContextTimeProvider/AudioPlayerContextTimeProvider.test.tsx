import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextTimeProvider } from './AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTime } from './useAudioPlayerContextTime';

describe('AudioPlayerContextTimeProvider', () => {
  test('should initialize with default values when no props provided', () => {
    const { result } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: AudioPlayerContextTimeProvider,
    });

    expect(result.current).toEqual({
      currentTime: 0,
      duration: 0,
      seek: expect.any(Function),
      setDuration: expect.any(Function),
    });
  });

  test('should initialize with custom default values', () => {
    const defaultProps = {
      defaultCurrentTime: 30,
      defaultDuration: 120,
    };

    const { result } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextTimeProvider {...defaultProps}>
          {children}
        </AudioPlayerContextTimeProvider>
      ),
    });

    expect(result.current).toEqual({
      currentTime: 30,
      duration: 120,
      seek: expect.any(Function),
      setDuration: expect.any(Function),
    });
  });

  test('should maintain stable function references between renders', () => {
    const { result, rerender } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: AudioPlayerContextTimeProvider,
    });

    const { seek: initialSeek, setDuration: initialSetDuration } = result.current;

    rerender();

    expect(result.current.seek).toBe(initialSeek);
    expect(result.current.setDuration).toBe(initialSetDuration);
  });
});
