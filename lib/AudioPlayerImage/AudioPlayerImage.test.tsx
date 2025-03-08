import { screen, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerImage, AudioPlayerImageBase } from './AudioPlayerImage';
import { trackData } from '@lib/AudioPlayer/data';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';

describe('AudioPlayerImage', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerImage />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
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

describe('AudioPlayerImageBase', () => {
  test('should render as div by default', () => {
    render(
      <AudioPlayerImageBase
        data-testid="container"
        src="test.jpg"
        altText="Test image"
      />,
    );

    const container = screen.getByTestId('container');
    expect(container.tagName.toLowerCase()).toBe('div');
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  // test('should render as different element', () => {
  //   render(
  //     <AudioPlayerImageBase
  //       as="figure"
  //       data-testid="container"
  //       src="test.jpg"
  //       altText="Test image"
  //     />,
  //   );

  //   const container = screen.getByTestId('container');
  //   expect(container.tagName.toLowerCase()).toBe('figure');
  //   expect(container.querySelector('img')).toBeInTheDocument();
  // });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerImageBase
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
      <AudioPlayerImageBase
        data-testid="container"
        src="test.jpg"
        altText="Test image"
        aria-label="Track artwork"
      />,
    );

    expect(screen.getByTestId('container')).toHaveAttribute('aria-label', 'Track artwork');
  });
});
