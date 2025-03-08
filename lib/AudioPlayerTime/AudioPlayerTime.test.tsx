import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerTime, AudioPlayerTimeBase } from './AudioPlayerTime';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerTime', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerTime />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render current time and duration', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerTime data-testid="time" />
        </AudioPlayerContextProvider>,
      );

      const time = screen.getByTestId('time');
      expect(time).toHaveTextContent('00:00 / 00:00');
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerTime
            className="custom-class"
            data-testid="time"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('time')).toHaveClass('custom-class');
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerTime
            data-testid="time"
            aria-label="Track time"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('time')).toHaveAttribute('aria-label', 'Track time');
    });
  });
});

describe('AudioPlayerTimeBase', () => {
  test('should render as span by default', () => {
    render(
      <AudioPlayerTimeBase
        data-testid="time"
        currentTime="60"
        duration="180"
      />,
    );

    const element = screen.getByTestId('time');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerTimeBase
        className="custom-class"
        data-testid="time"
        currentTime="0"
        duration="0"
      />,
    );

    expect(screen.getByTestId('time')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerTimeBase
        data-testid="time"
        currentTime="0"
        duration="0"
        aria-label="Track time"
      />,
    );

    expect(screen.getByTestId('time')).toHaveAttribute('aria-label', 'Track time');
  });
});
