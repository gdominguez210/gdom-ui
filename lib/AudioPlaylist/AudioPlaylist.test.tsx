import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylist } from '@/lib/AudioPlaylist/AudioPlaylist';
import { trackData } from '@/data/trackData';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

describe('AudioPlaylist', () => {
  test('should render with default props', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylist.Container data-testid="audio-playlist">
          <div>Content</div>
        </AudioPlaylist.Container>
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('audio-playlist');
    expect(element).toBeInTheDocument();
  });

  test('should render all compound components', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylist.Provider>
          <AudioPlaylist.ExpandableContainer data-testid="expandable-container">
            <AudioPlaylist.Container>
              <AudioPlaylist.Header data-testid="header">
                <span>Playlist</span>
                <AudioPlaylist.Dismiss data-testid="dismiss" />
              </AudioPlaylist.Header>
              <AudioPlaylist.Tracks data-testid="tracks" />
            </AudioPlaylist.Container>
          </AudioPlaylist.ExpandableContainer>
          <AudioPlaylist.ControlToggle data-testid="control-toggle" />
        </AudioPlaylist.Provider>
      </AudioPlayerContextProvider>,
    );

    expect(screen.getByTestId('expandable-container')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('dismiss')).toBeInTheDocument();
    expect(screen.getByTestId('tracks')).toBeInTheDocument();
    expect(screen.getByTestId('control-toggle')).toBeInTheDocument();
  });
});
