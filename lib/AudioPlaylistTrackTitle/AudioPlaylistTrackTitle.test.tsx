import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTrackTitle } from './AudioPlaylistTrackTitle';
import { AudioPlaylistTrackContextProvider } from '@lib/AudioPlaylistTrackContextProvider';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlaylistTrackTitle', () => {
  test('should render with track data from context', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackTitle data-testid="track-title" />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-title');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(trackData[0]!.title);
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackTitle
            data-testid="track-title"
            className="custom-class"
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-title');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistTrackContextProvider
          track={trackData[0]!}
          index={0}
        >
          <AudioPlaylistTrackTitle
            as="h3"
            data-testid="track-title"
          />
        </AudioPlaylistTrackContextProvider>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('track-title');
    expect(element.tagName.toLowerCase()).toBe('h3');
  });
});
