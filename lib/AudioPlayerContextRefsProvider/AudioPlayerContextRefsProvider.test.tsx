import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextRefsProvider } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextRefs } from './useAudioPlayerContextRefs';

describe('AudioPlayerContextRefsProvider', () => {
  test('should initialize with null refs', () => {
    const { result } = renderHook(() => useAudioPlayerContextRefs(), {
      wrapper: AudioPlayerContextRefsProvider,
    });

    expect(result.current).toEqual({
      audioRef: { current: null },
      progressBarRef: { current: null },
    });
  });

  test('should maintain stable ref objects between renders', () => {
    const { result, rerender } = renderHook(() => useAudioPlayerContextRefs(), {
      wrapper: AudioPlayerContextRefsProvider,
    });

    const { audioRef: initialAudioRef, progressBarRef: initialProgressBarRef } = result.current;

    rerender();

    expect(result.current.audioRef).toBe(initialAudioRef);
    expect(result.current.progressBarRef).toBe(initialProgressBarRef);
  });
});
