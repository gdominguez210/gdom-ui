import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useAudioPlayerTime } from './useAudioPlayerTime';

describe('useAudioPlayerTime', () => {
  test('should format zero values', () => {
    const { result } = renderHook(() => useAudioPlayerTime({ currentTime: 0, duration: 0 }));

    expect(result.current.currentTimeDisplay).toBe('00:00');
    expect(result.current.durationDisplay).toBe('00:00');
  });

  test('should format minutes and seconds', () => {
    const { result } = renderHook(() => useAudioPlayerTime({ currentTime: 125, duration: 300 }));

    expect(result.current.currentTimeDisplay).toBe('02:05');
    expect(result.current.durationDisplay).toBe('05:00');
  });

  test('should format hours, minutes and seconds', () => {
    const { result } = renderHook(() => useAudioPlayerTime({ currentTime: 3661, duration: 7322 }));

    expect(result.current.currentTimeDisplay).toBe('01:01:01');
    expect(result.current.durationDisplay).toBe('02:02:02');
  });
});
