import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControlLoop } from '@lib/AudioPlayerControlLoop/AudioPlayerControlLoop';
import { AudioPlayerControlLoopPrimitive } from '@lib/AudioPlayerControlLoop/AudioPlayerControlLoopPrimitive';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_AUDIO_ERROR } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudio';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControlLoop', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControlLoop />)).toThrow(AUDIO_PLAYER_CONTEXT_AUDIO_ERROR);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render loop button by default', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlLoop data-testid="loop-button" />
        </AudioPlayerContextProvider>,
      );

      const button = screen.getByTestId('loop-button');
      expect(button).toHaveAttribute('aria-pressed', 'false');
      expect(button).toHaveAttribute('aria-label', 'Toggle Loop');
    });

    test('should toggle loop state on click', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlLoop data-testid="loop-button" />
        </AudioPlayerContextProvider>,
      );

      const button = screen.getByTestId('loop-button');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    test('should call custom onClick handler', () => {
      const handleClick = vi.fn();
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlLoop
            onClick={handleClick}
            data-testid="loop-button"
          />
        </AudioPlayerContextProvider>,
      );

      fireEvent.click(screen.getByTestId('loop-button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('AudioPlayerControlLoopPrimitive', () => {
  test('should render inactive state by default', () => {
    render(
      <AudioPlayerControlLoopPrimitive
        active={false}
        data-testid="loop-button"
      />,
    );

    const button = screen.getByTestId('loop-button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveClass('text-neutral-100/50');
  });

  test('should render active state', () => {
    render(
      <AudioPlayerControlLoopPrimitive
        active={true}
        data-testid="loop-button"
      />,
    );

    const button = screen.getByTestId('loop-button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).not.toHaveClass('text-neutral-100/50');
  });

  test('should forward additional props', () => {
    const handleClick = vi.fn();
    render(
      <AudioPlayerControlLoopPrimitive
        onClick={handleClick}
        data-testid="loop-button"
        className="custom-class"
      />,
    );

    const button = screen.getByTestId('loop-button');
    expect(button).toHaveClass('custom-class');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
