import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerTitle, AudioPlayerTitleBase } from './AudioPlayerTitle';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerTitle', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerTitle />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render current track title', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerTitle data-testid="title" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('title')).toHaveTextContent(trackData[0]!.title);
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerTitle
            className="custom-class"
            data-testid="title"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('title')).toHaveClass('custom-class');
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerTitle
            data-testid="title"
            aria-label="Track title"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('title')).toHaveAttribute('aria-label', 'Track title');
    });
  });
});

describe('AudioPlayerTitleBase', () => {
  test('should render as p by default', () => {
    render(<AudioPlayerTitleBase data-testid="title">Track Title</AudioPlayerTitleBase>);

    const element = screen.getByTestId('title');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  test('should render children', () => {
    render(<AudioPlayerTitleBase data-testid="title">Track Title</AudioPlayerTitleBase>);

    expect(screen.getByTestId('title')).toHaveTextContent('Track Title');
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerTitleBase
        className="custom-class"
        data-testid="title"
      >
        Track Title
      </AudioPlayerTitleBase>,
    );

    expect(screen.getByTestId('title')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerTitleBase
        data-testid="title"
        aria-label="Track title"
      >
        Track Title
      </AudioPlayerTitleBase>,
    );

    expect(screen.getByTestId('title')).toHaveAttribute('aria-label', 'Track title');
  });
});
