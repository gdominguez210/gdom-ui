import { screen, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerAuthor } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerAuthorPrimitive } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthorPrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider';
import { trackData } from '@/lib/AudioPlayer/data';

describe('AudioPlayerAuthor', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerAuthor />)).toThrow();
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

describe('AudioPlayerAuthorPrimitive', () => {
  test('should render as a <p> by default', () => {
    render(
      <AudioPlayerAuthorPrimitive data-testid="primitive">Author Name</AudioPlayerAuthorPrimitive>,
    );

    const element = screen.getByTestId('primitive');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  test('should render children', () => {
    const authorText = 'Test Author';
    render(
      <AudioPlayerAuthorPrimitive data-testid="primitive">{authorText}</AudioPlayerAuthorPrimitive>,
    );

    const element = screen.getByTestId('primitive');
    expect(element).toHaveTextContent(authorText);
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerAuthorPrimitive
        className="custom-class"
        data-testid="primitive"
      >
        Author Name
      </AudioPlayerAuthorPrimitive>,
    );

    const element = screen.getByTestId('primitive');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as different element', () => {
    render(
      <AudioPlayerAuthorPrimitive
        as="span"
        data-testid="primitive"
      >
        Author Name
      </AudioPlayerAuthorPrimitive>,
    );

    const element = screen.getByTestId('primitive');
    expect(element.tagName.toLowerCase()).toBe('span');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerAuthorPrimitive
        data-testid="primitive"
        aria-label="Track author"
        title="Author tooltip"
      >
        Author Name
      </AudioPlayerAuthorPrimitive>,
    );

    const element = screen.getByTestId('primitive');
    expect(element).toHaveAttribute('aria-label', 'Track author');
    expect(element).toHaveAttribute('title', 'Author tooltip');
  });
});
