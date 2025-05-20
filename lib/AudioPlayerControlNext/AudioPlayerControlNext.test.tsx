import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControlNext } from '@/lib/AudioPlayerControlNext/AudioPlayerControlNext';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/lib/AudioPlayer/data';

describe('AudioPlayerControlNext', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControlNext />)).toThrow();
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render next track button', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlNext data-testid="next-button" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlNext
            className="custom-class"
            data-testid="next-button"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('next-button')).toHaveClass('custom-class');
    });

    test('should call custom onClick handler', () => {
      const handleClick = vi.fn();

      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlNext
            onClick={handleClick}
            data-testid="next-button"
          />
        </AudioPlayerContextProvider>,
      );

      fireEvent.click(screen.getByTestId('next-button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlNext
            data-testid="next-button"
            aria-label="Next track"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('next-button')).toHaveAttribute('aria-label', 'Next track');
    });
  });
});
