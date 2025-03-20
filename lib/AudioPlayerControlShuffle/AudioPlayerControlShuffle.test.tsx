import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import {
  AudioPlayerControlShuffle,
  AudioPlayerControlShufflePrimitive,
} from './AudioPlayerControlShuffle';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_AUDIO_ERROR } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudio';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControlShuffle', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControlShuffle />)).toThrow(AUDIO_PLAYER_CONTEXT_AUDIO_ERROR);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render shuffle button by default', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlShuffle data-testid="shuffle-button" />
        </AudioPlayerContextProvider>,
      );

      const button = screen.getByTestId('shuffle-button');
      expect(button).toHaveAttribute('aria-pressed', 'false');
      expect(button).toHaveAttribute('aria-label', 'Toggle Shuffle');
    });

    test('should toggle shuffle state on click', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlShuffle data-testid="shuffle-button" />
        </AudioPlayerContextProvider>,
      );

      const button = screen.getByTestId('shuffle-button');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    test('should call custom onClick handler', () => {
      const handleClick = vi.fn();
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlShuffle
            onClick={handleClick}
            data-testid="shuffle-button"
          />
        </AudioPlayerContextProvider>,
      );

      fireEvent.click(screen.getByTestId('shuffle-button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('AudioPlayerControlShufflePrimitive', () => {
  test('should render inactive state by default', () => {
    render(
      <AudioPlayerControlShufflePrimitive
        active={false}
        data-testid="shuffle-button"
      />,
    );

    const button = screen.getByTestId('shuffle-button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveClass('text-neutral-100/50');
  });

  test('should render active state', () => {
    render(
      <AudioPlayerControlShufflePrimitive
        active={true}
        data-testid="shuffle-button"
      />,
    );

    const button = screen.getByTestId('shuffle-button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).not.toHaveClass('text-neutral-100/50');
  });

  test('should forward additional props', () => {
    const handleClick = vi.fn();
    render(
      <AudioPlayerControlShufflePrimitive
        onClick={handleClick}
        data-testid="shuffle-button"
        className="custom-class"
      />,
    );

    const button = screen.getByTestId('shuffle-button');
    expect(button).toHaveClass('custom-class');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
