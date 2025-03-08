import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControls, AudioPlayerControlsBase } from './AudioPlayerControls';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControls', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControls />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render play button when paused', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControls data-testid="controls" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByLabelText('Play')).toBeInTheDocument();
      expect(screen.queryByLabelText('Pause')).not.toBeInTheDocument();
    });

    test('should render pause button when playing', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControls data-testid="controls" />
        </AudioPlayerContextProvider>,
      );

      const playButton = screen.getByLabelText('Play');
      fireEvent.click(playButton);

      expect(screen.getByLabelText('Pause')).toBeInTheDocument();
      expect(screen.queryByLabelText('Play')).not.toBeInTheDocument();
    });

    test('should toggle play/pause on button click', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControls data-testid="controls" />
        </AudioPlayerContextProvider>,
      );

      const playButton = screen.getByLabelText('Play');
      fireEvent.click(playButton);
      expect(screen.getByLabelText('Pause')).toBeInTheDocument();

      const pauseButton = screen.getByLabelText('Pause');
      fireEvent.click(pauseButton);
      expect(screen.getByLabelText('Play')).toBeInTheDocument();
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControls
            className="custom-class"
            data-testid="controls"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('controls')).toHaveClass('custom-class');
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControls
            data-testid="controls"
            aria-label="Audio controls"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('controls')).toHaveAttribute('aria-label', 'Audio controls');
    });
  });
});

describe('AudioPlayerControlsBase', () => {
  test('should render as div by default', () => {
    render(
      <AudioPlayerControlsBase data-testid="base">
        <button>Play</button>
      </AudioPlayerControlsBase>,
    );

    const element = screen.getByTestId('base');
    expect(element.tagName.toLowerCase()).toBe('div');
  });

  test('should render children', () => {
    render(
      <AudioPlayerControlsBase data-testid="base">
        <button data-testid="child">Play</button>
      </AudioPlayerControlsBase>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Play');
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerControlsBase
        className="custom-class"
        data-testid="base"
      >
        <button>Play</button>
      </AudioPlayerControlsBase>,
    );

    const element = screen.getByTestId('base');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as different element', () => {
    render(
      <AudioPlayerControlsBase
        as="section"
        data-testid="base"
      >
        <button>Play</button>
      </AudioPlayerControlsBase>,
    );

    const element = screen.getByTestId('base');
    expect(element.tagName.toLowerCase()).toBe('section');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerControlsBase
        data-testid="base"
        aria-label="Player controls"
        role="group"
      >
        <button>Play</button>
      </AudioPlayerControlsBase>,
    );

    const element = screen.getByTestId('base');
    expect(element).toHaveAttribute('aria-label', 'Player controls');
    expect(element).toHaveAttribute('role', 'group');
  });
});
