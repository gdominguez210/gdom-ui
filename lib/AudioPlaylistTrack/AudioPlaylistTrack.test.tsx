import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTrack } from '@/lib/AudioPlaylistTrack/AudioPlaylistTrack';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';
import type { AudioTrackData } from '@/lib/AudioPlayerContextTrackProvider/reducer';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider/AudioPlaylistContextProvider';

describe('AudioPlaylistTrack compound component', () => {
  test('should render Track compound components', () => {
    render(
      <AudioPlayerContextProvider tracks={trackData}>
        <AudioPlaylistContextProvider>
          <AudioPlaylistTrack.Provider
            index={0}
            track={trackData[0]!}
          >
            <AudioPlaylistTrack.Container data-testid="track-root">
              <AudioPlaylistTrack.Image data-testid="track-image" />
              <div>
                <AudioPlaylistTrack.Title data-testid="track-title" />
                <AudioPlaylistTrack.Author data-testid="track-author" />
              </div>
            </AudioPlaylistTrack.Container>
          </AudioPlaylistTrack.Provider>
        </AudioPlaylistContextProvider>
      </AudioPlayerContextProvider>,
    );

    expect(screen.getByTestId('track-root')).toBeInTheDocument();
    expect(screen.getByTestId('track-image')).toBeInTheDocument();
    expect(screen.getByTestId('track-title')).toBeInTheDocument();
    expect(screen.getByTestId('track-author')).toBeInTheDocument();
  });

  test('should apply selected class when track is active', () => {
    const track0 = trackData[0] as AudioTrackData;
    const track1 = trackData[1] as AudioTrackData;

    render(
      <AudioPlayerContextProvider
        tracks={trackData}
        defaultTrackIndex={1}
      >
        <AudioPlaylistContextProvider>
          <AudioPlaylistTrack.Provider
            index={0}
            track={track0}
          >
            <AudioPlaylistTrack.Container data-testid="track-0" />
          </AudioPlaylistTrack.Provider>
          <AudioPlaylistTrack.Provider
            index={1}
            track={track1}
          >
            <AudioPlaylistTrack.Container data-testid="track-1" />
          </AudioPlaylistTrack.Provider>
        </AudioPlaylistContextProvider>
      </AudioPlayerContextProvider>,
    );

    expect(screen.getByTestId('track-0')).not.toHaveAttribute('aria-current', 'true');
    expect(screen.getByTestId('track-1')).toHaveAttribute('aria-current', 'true');
  });
});
