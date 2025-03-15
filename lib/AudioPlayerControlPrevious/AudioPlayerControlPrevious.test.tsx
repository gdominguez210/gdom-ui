import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControlPrevious } from './AudioPlayerControlPrevious';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_TRACK_ERROR } from '@lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrack';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControlPrevious', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControlPrevious />)).toThrow(
        AUDIO_PLAYER_CONTEXT_TRACK_ERROR,
      );
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render previous track button', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPrevious data-testid="previous-button" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('previous-button')).toBeInTheDocument();
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPrevious
            className="custom-class"
            data-testid="previous-button"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('previous-button')).toHaveClass('custom-class');
    });

    test('should call custom onClick handler', () => {
      const handleClick = vi.fn();

      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPrevious
            onClick={handleClick}
            data-testid="previous-button"
          />
        </AudioPlayerContextProvider>,
      );

      fireEvent.click(screen.getByTestId('previous-button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPrevious
            data-testid="previous-button"
            aria-label="Previous track"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('previous-button')).toHaveAttribute('aria-label', 'Previous track');
    });
  });
});
