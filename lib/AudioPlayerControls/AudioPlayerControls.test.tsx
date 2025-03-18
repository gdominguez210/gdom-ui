import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerControls, AudioPlayerControlsPrimitive } from './AudioPlayerControls';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControls', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControls />)).toThrow();
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
      expect(screen.getByRole('button', { name: 'Previous Track' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next Track' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Toggle Loop' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Toggle Shuffle' })).toBeInTheDocument();
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
