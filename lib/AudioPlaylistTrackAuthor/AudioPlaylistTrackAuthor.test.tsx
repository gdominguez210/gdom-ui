import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTrackAuthor } from './AudioPlaylistTrackAuthor';
import { AudioPlaylistTrackContextProvider } from '@/lib/AudioPlaylistTrackContextProvider';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';

describe('AudioPlaylistTrackAuthor', () => {
  test('should render with track data from context', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackAuthor data-testid="track-author" />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-author');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(trackData[0]!.author);
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackAuthor
            data-testid="track-author"
            className="custom-class"
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-author');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackAuthor
            as="div"
            data-testid="track-author"
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-author');
    expect(element.tagName.toLowerCase()).toBe('div');
  });
});
