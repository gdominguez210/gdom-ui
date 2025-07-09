import { renderHook, act } from '@testing-library/react';
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
      previewTime: null,
      seek: expect.any(Function),
      setDuration: expect.any(Function),
      setPreviewTime: expect.any(Function),
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
      previewTime: null,
      seek: expect.any(Function),
      setDuration: expect.any(Function),
      setPreviewTime: expect.any(Function),
    });
  });

  test('should maintain stable function references between renders', () => {
    const { result, rerender } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: AudioPlayerContextTimeProvider,
    });

    const {
      seek: initialSeek,
      setDuration: initialSetDuration,
      setPreviewTime: initialSetPreviewTime,
    } = result.current;

    rerender();

    expect(result.current.seek).toBe(initialSeek);
    expect(result.current.setDuration).toBe(initialSetDuration);
    expect(result.current.setPreviewTime).toBe(initialSetPreviewTime);
  });

  test('should update previewTime when setPreviewTime is called', () => {
    const { result } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: AudioPlayerContextTimeProvider,
    });

    act(() => {
      result.current.setPreviewTime(45);
    });

    expect(result.current.previewTime).toBe(45);
  });

  test('should set previewTime to null when setPreviewTime is called with null', () => {
    const { result } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: AudioPlayerContextTimeProvider,
    });

    act(() => {
      result.current.setPreviewTime(45);
    });
    expect(result.current.previewTime).toBe(45);

    act(() => {
      result.current.setPreviewTime(null);
    });
    expect(result.current.previewTime).toBe(null);
  });

  test('should maintain previewTime independently from currentTime', () => {
    const { result } = renderHook(() => useAudioPlayerContextTime(), {
      wrapper: AudioPlayerContextTimeProvider,
    });

    act(() => {
      result.current.setPreviewTime(45);
      result.current.seek(30);
    });

    expect(result.current.previewTime).toBe(45);
    expect(result.current.currentTime).toBe(30);
  });
});
