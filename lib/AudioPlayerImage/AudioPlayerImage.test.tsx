import { screen, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerImage } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerImagePrimitive } from '@lib/AudioPlayerImage/AudioPlayerImagePrimitive';
import { trackData } from '@lib/AudioPlayer/data';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

describe('AudioPlayerImage', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerImage />)).toThrow();
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render current track image', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerImage data-testid="container" />
        </AudioPlayerContextProvider>,
      );

      const container = screen.getByTestId('container');
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('src', trackData[0]!.thumbnail);
      expect(image).toHaveAttribute('alt', `${trackData[0]!.title} thumbnail`);
    });

    test('should allow custom className on container', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerImage
            className="custom-class"
            data-testid="container"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('container')).toHaveClass('custom-class');
    });

    test('should forward additional props to container', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerImage
            data-testid="container"
            aria-label="Track artwork"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('container')).toHaveAttribute('aria-label', 'Track artwork');
    });
  });
});

describe('AudioPlayerImagePrimitive', () => {
  test('should render as div by default', () => {
    render(
      <AudioPlayerImagePrimitive
        data-testid="container"
        src="test.jpg"
        altText="Test image"
      />,
    );

    const container = screen.getByTestId('container');
    expect(container.tagName.toLowerCase()).toBe('div');
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('should render as different element', () => {
    render(
      <AudioPlayerImagePrimitive
        as="figure"
        data-testid="container"
        src="test.jpg"
        altText="Test image"
      />,
    );

    const container = screen.getByTestId('container');
    expect(container.tagName.toLowerCase()).toBe('figure');
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerImagePrimitive
        className="custom-class"
        data-testid="container"
        src="test.jpg"
        altText="Test image"
      />,
    );

    expect(screen.getByTestId('container')).toHaveClass('custom-class');
  });

  test('should forward additional props to container', () => {
    render(
      <AudioPlayerImagePrimitive
        data-testid="container"
        src="test.jpg"
        altText="Test image"
        aria-label="Track artwork"
      />,
    );

    expect(screen.getByTestId('container')).toHaveAttribute('aria-label', 'Track artwork');
  });
});
