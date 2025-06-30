import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerTitle } from '@/lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerTitlePrimitive } from '@/lib/AudioPlayerTitle/AudioPlayerTitlePrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';

describe('AudioPlayerTitle', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerTitle />)).toThrow();
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

describe('AudioPlayerTitlePrimitive', () => {
  test('should render as p by default', () => {
    render(<AudioPlayerTitlePrimitive data-testid="title">Track Title</AudioPlayerTitlePrimitive>);

    const element = screen.getByTestId('title');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  test('should render children', () => {
    render(<AudioPlayerTitlePrimitive data-testid="title">Track Title</AudioPlayerTitlePrimitive>);

    expect(screen.getByTestId('title')).toHaveTextContent('Track Title');
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerTitlePrimitive
        className="custom-class"
        data-testid="title"
      >
        Track Title
      </AudioPlayerTitlePrimitive>,
    );

    expect(screen.getByTestId('title')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerTitlePrimitive
        data-testid="title"
        aria-label="Track title"
      >
        Track Title
      </AudioPlayerTitlePrimitive>,
    );

    expect(screen.getByTestId('title')).toHaveAttribute('aria-label', 'Track title');
  });
});
