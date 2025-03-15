import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControlPlay, AudioPlayerControlPlayPrimitive } from './AudioPlayerControlPlay';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_AUDIO_ERROR } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudio';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControlPlay', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControlPlay />)).toThrow(AUDIO_PLAYER_CONTEXT_AUDIO_ERROR);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render play button', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPlay data-testid="play-button" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('play-button')).toBeInTheDocument();
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPlay
            className="custom-class"
            data-testid="play-button"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('play-button')).toHaveClass('custom-class');
    });

    test('should call custom onClick handler', () => {
      const handleClick = vi.fn();

      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPlay
            onClick={handleClick}
            data-testid="play-button"
          />
        </AudioPlayerContextProvider>,
      );

      fireEvent.click(screen.getByTestId('play-button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlPlay
            data-testid="play-button"
            aria-label="Play/Pause"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('play-button')).toHaveAttribute('aria-label', 'Play/Pause');
    });
  });
});

describe('AudioPlayerControlPlayPrimitive', () => {
  test('should render play button when not active', () => {
    render(
      <AudioPlayerControlPlayPrimitive
        active={false}
        data-testid="play-button"
      />,
    );

    const button = screen.getByTestId('play-button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('aria-label', 'Play');
  });

  test('should render pause button when active', () => {
    render(
      <AudioPlayerControlPlayPrimitive
        active={true}
        data-testid="play-button"
      />,
    );

    const button = screen.getByTestId('play-button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('aria-label', 'Pause');
  });

  test('should forward additional props', () => {
    const handleClick = vi.fn();
    render(
      <AudioPlayerControlPlayPrimitive
        onClick={handleClick}
        data-testid="play-button"
        className="custom-class"
      />,
    );

    const button = screen.getByTestId('play-button');
    expect(button).toHaveClass('custom-class');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
