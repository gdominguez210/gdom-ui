import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextTrackProvider } from '@/lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextTrack } from './useAudioPlayerContextTrack';
import { trackData } from '@/data/trackData';

describe('AudioPlayerContextTrackProvider', () => {
  test('should initialize with default track index when not provided', () => {
    const { result } = renderHook(() => useAudioPlayerContextTrack(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextTrackProvider tracks={trackData}>
          {children}
        </AudioPlayerContextTrackProvider>
      ),
    });

    expect(result.current).toEqual({
      currentTrackIndex: 0,
      tracks: trackData,
      currentTrack: trackData[0],
      setTrackIndex: expect.any(Function),
    });
  });

  test('should initialize with custom default track index', () => {
    const { result } = renderHook(() => useAudioPlayerContextTrack(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextTrackProvider
          tracks={trackData}
          defaultTrackIndex={1}
        >
          {children}
        </AudioPlayerContextTrackProvider>
      ),
    });

    expect(result.current).toEqual({
      currentTrackIndex: 1,
      tracks: trackData,
      currentTrack: trackData[1],
      setTrackIndex: expect.any(Function),
    });
  });

  test('should maintain stable function references between renders', () => {
    const { result, rerender } = renderHook(() => useAudioPlayerContextTrack(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextTrackProvider tracks={trackData}>
          {children}
        </AudioPlayerContextTrackProvider>
      ),
    });

    const { setTrackIndex: initialSetTrackIndex } = result.current;

    rerender();

    expect(result.current.setTrackIndex).toBe(initialSetTrackIndex);
  });
});
