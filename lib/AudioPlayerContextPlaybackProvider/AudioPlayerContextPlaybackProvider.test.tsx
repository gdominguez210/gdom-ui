import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextPlaybackProvider } from '@/lib/AudioPlayerContextPlaybackProvider/AudioPlayerContextPlaybackProvider';
import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';

describe('AudioPlayerContextPlaybackProvider', () => {
  test('should initialize with default values when no props provided', () => {
    const { result } = renderHook(() => useAudioPlayerContextPlayback(), {
      wrapper: AudioPlayerContextPlaybackProvider,
    });

    expect(result.current).toEqual({
      isPlaying: false,
      volume: 50,
      mute: false,
      shuffle: false,
      loop: false,
      play: expect.any(Function),
      pause: expect.any(Function),
      togglePlay: expect.any(Function),
      setVolume: expect.any(Function),
      setMute: expect.any(Function),
      toggleMute: expect.any(Function),
      setShuffle: expect.any(Function),
      toggleShuffle: expect.any(Function),
      setLoop: expect.any(Function),
      toggleLoop: expect.any(Function),
    });
  });

  test('should initialize with custom default values', () => {
    const defaultProps = {
      defaultVolume: 0.5,
      defaultMute: true,
      defaultShuffle: true,
      defaultLoop: true,
    };

    const { result } = renderHook(() => useAudioPlayerContextPlayback(), {
      wrapper: ({ children }) => (
        <AudioPlayerContextPlaybackProvider {...defaultProps}>
          {children}
        </AudioPlayerContextPlaybackProvider>
      ),
    });

    expect(result.current).toMatchObject({
      volume: 0.5,
      mute: true,
      shuffle: true,
      loop: true,
    });
  });

  test('should maintain stable function references between renders', () => {
    const { result, rerender } = renderHook(() => useAudioPlayerContextPlayback(), {
      wrapper: AudioPlayerContextPlaybackProvider,
    });

    const initialFunctions = {
      play: result.current.play,
      pause: result.current.pause,
      togglePlay: result.current.togglePlay,
      setVolume: result.current.setVolume,
      setMute: result.current.setMute,
      toggleMute: result.current.toggleMute,
      setShuffle: result.current.setShuffle,
      toggleShuffle: result.current.toggleShuffle,
      setLoop: result.current.setLoop,
      toggleLoop: result.current.toggleLoop,
    };

    rerender();

    expect(result.current.play).toBe(initialFunctions.play);
    expect(result.current.pause).toBe(initialFunctions.pause);
    expect(result.current.togglePlay).toBe(initialFunctions.togglePlay);
    expect(result.current.setVolume).toBe(initialFunctions.setVolume);
    expect(result.current.setMute).toBe(initialFunctions.setMute);
    expect(result.current.toggleMute).toBe(initialFunctions.toggleMute);
    expect(result.current.setShuffle).toBe(initialFunctions.setShuffle);
    expect(result.current.toggleShuffle).toBe(initialFunctions.toggleShuffle);
    expect(result.current.setLoop).toBe(initialFunctions.setLoop);
    expect(result.current.toggleLoop).toBe(initialFunctions.toggleLoop);
  });
});
