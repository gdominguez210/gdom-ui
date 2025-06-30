import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTrackImage } from './AudioPlaylistTrackImage';
import { AudioPlaylistTrackContextProvider } from '@/lib/AudioPlaylistTrackContextProvider';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';

describe('AudioPlaylistTrackImage', () => {
  test('should render with track data from context', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackImage data-testid="track-image" />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-image');
    expect(element).toBeInTheDocument();

    const img = element.querySelector('img');
    expect(img).toBeInTheDocument();

    if (trackData[0]!.thumbnail) {
      expect(img).toHaveAttribute('src', trackData[0]!.thumbnail);
    }

    const altText = img?.getAttribute('alt');
    expect(altText).toContain(trackData[0]!.title);
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackImage
            data-testid="track-image"
            className="custom-class"
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-image');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('flex');
  });

  test('should render with custom dimensions', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackImage
            data-testid="track-image"
            width={64}
            height={64}
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-image');
    const img = element.querySelector('img');

    expect(img).toHaveAttribute('width', '64');
    expect(img).toHaveAttribute('height', '64');
  });

  test('should have correct HTML structure', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackImage data-testid="track-image" />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-image');
    const img = element.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  test('should use style props from AudioPlayerImageProps', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackImage
            data-testid="track-image"
            style={{ border: '1px solid red' }}
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-image');
    expect(element).toHaveStyle({ border: '1px solid red' });
  });
});
