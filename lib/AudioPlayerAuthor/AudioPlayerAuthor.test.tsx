import { screen, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerAuthor, AudioPlayerAuthorBase } from '@lib/AudioPlayerAuthor';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerAuthor', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerAuthor />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render author from current track', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerAuthor data-testid="author" />
        </AudioPlayerContextProvider>,
      );

      const authorElement = screen.getByTestId('author');
      expect(authorElement).toHaveTextContent(trackData[0]!.author);
    });

    test('should render author from specified track index', () => {
      const trackIndex = 1;

      render(
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultTrackIndex={trackIndex}
        >
          <AudioPlayerAuthor data-testid="author" />
        </AudioPlayerContextProvider>,
      );

      const authorElement = screen.getByTestId('author');
      expect(authorElement).toHaveTextContent(trackData[trackIndex]!.author);
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerAuthor
            className="custom-class"
            data-testid="author"
          />
        </AudioPlayerContextProvider>,
      );

      const authorElement = screen.getByTestId('author');
      expect(authorElement).toHaveClass('custom-class');
    });

    test('should render as different element', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerAuthor
            as="h2"
            data-testid="author"
          />
        </AudioPlayerContextProvider>,
      );

      const authorElement = screen.getByTestId('author');
      expect(authorElement.tagName.toLowerCase()).toBe('h2');
    });

    test('should pass through additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerAuthor
            data-testid="author"
            aria-label="Track author"
          />
        </AudioPlayerContextProvider>,
      );

      const authorElement = screen.getByTestId('author');
      expect(authorElement).toHaveAttribute('aria-label', 'Track author');
    });
  });
});

describe('AudioPlayerAuthorBase', () => {
  test('should render as a <p> by default', () => {
    render(<AudioPlayerAuthorBase data-testid="base">Author Name</AudioPlayerAuthorBase>);

    const element = screen.getByTestId('base');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  test('should render children', () => {
    const authorText = 'Test Author';
    render(<AudioPlayerAuthorBase data-testid="base">{authorText}</AudioPlayerAuthorBase>);

    const element = screen.getByTestId('base');
    expect(element).toHaveTextContent(authorText);
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerAuthorBase
        className="custom-class"
        data-testid="base"
      >
        Author Name
      </AudioPlayerAuthorBase>,
    );

    const element = screen.getByTestId('base');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as different element', () => {
    render(
      <AudioPlayerAuthorBase
        as="span"
        data-testid="base"
      >
        Author Name
      </AudioPlayerAuthorBase>,
    );

    const element = screen.getByTestId('base');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerAuthorBase
        data-testid="base"
        aria-label="Track author"
        title="Author tooltip"
      >
        Author Name
      </AudioPlayerAuthorBase>,
    );

    const element = screen.getByTestId('base');
    expect(element).toHaveAttribute('aria-label', 'Track author');
    expect(element).toHaveAttribute('title', 'Author tooltip');
  });
});
