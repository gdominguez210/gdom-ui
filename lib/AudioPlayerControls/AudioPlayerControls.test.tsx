import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControls, AudioPlayerControlsPrimitive } from './AudioPlayerControls';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_AUDIO_ERROR } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudio';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControls', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControls />)).toThrow(AUDIO_PLAYER_CONTEXT_AUDIO_ERROR);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render all control buttons', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControls data-testid="controls" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('controls')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Previous track' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next track' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Toggle loop' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Toggle shuffle' })).toBeInTheDocument();
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

describe('AudioPlayerControlsPrimitive', () => {
  test('should render children', () => {
    render(
      <AudioPlayerControlsPrimitive data-testid="controls">
        <button>Test Button</button>
      </AudioPlayerControlsPrimitive>,
    );

    expect(screen.getByTestId('controls')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  test('should allow custom className', () => {
    render(
      <AudioPlayerControlsPrimitive
        className="custom-class"
        data-testid="controls"
      >
        <button>Test Button</button>
      </AudioPlayerControlsPrimitive>,
    );

    expect(screen.getByTestId('controls')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerControlsPrimitive
        data-testid="controls"
        aria-label="Audio controls"
      >
        <button>Test Button</button>
      </AudioPlayerControlsPrimitive>,
    );

    expect(screen.getByTestId('controls')).toHaveAttribute('aria-label', 'Audio controls');
  });
});
