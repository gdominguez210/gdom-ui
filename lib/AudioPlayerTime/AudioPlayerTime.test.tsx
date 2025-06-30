import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerTime } from '@/lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTimePrimitive } from '@/lib/AudioPlayerTime/AudioPlayerTimePrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';

describe('AudioPlayerTime', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerTime />)).toThrow();
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

describe('AudioPlayerTimePrimitive', () => {
  test('should render as span by default', () => {
    render(
      <AudioPlayerTimePrimitive
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
      <AudioPlayerTimePrimitive
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
      <AudioPlayerTimePrimitive
        data-testid="time"
        currentTime="0"
        duration="0"
        aria-label="Track time"
      />,
    );

    expect(screen.getByTestId('time')).toHaveAttribute('aria-label', 'Track time');
  });
});
