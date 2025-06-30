import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTrackCompoundComponent as AudioPlaylistTrack } from '@/lib/AudioPlaylistTrack/namespace';
import { AudioPlaylistTrackPrimitive } from '@/lib/AudioPlaylistTrack/AudioPlaylistTrackPrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';
import type { AudioTrackData } from '@/lib/AudioPlayerContextTrackProvider/reducer';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider/AudioPlaylistContextProvider';

describe('AudioPlaylistTrack', () => {
  describe('AudioPlaylistTrackPrimitive', () => {
    test('should render without context', () => {
      render(
        <AudioPlaylistTrackPrimitive data-testid="track-primitive">
          <div>Content</div>
        </AudioPlaylistTrackPrimitive>,
      );

      const element = screen.getByTestId('track-primitive');
      expect(element).toBeInTheDocument();
    });

    test('should apply default styles and allow custom className', () => {
      render(
        <AudioPlaylistTrackPrimitive
          data-testid="track-primitive"
          className="custom-class"
        >
          <div>Content</div>
        </AudioPlaylistTrackPrimitive>,
      );

      const element = screen.getByTestId('track-primitive');
      expect(element).toHaveClass('custom-class');
    });

    test('should render as a different element', () => {
      render(
        <AudioPlaylistTrackPrimitive
          as="div"
          data-testid="track-primitive"
        >
          <div>Content</div>
        </AudioPlaylistTrackPrimitive>,
      );

      const element = screen.getByTestId('track-primitive');
      expect(element.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('AudioPlaylistTrack compound component', () => {
    test('should render Track compound components', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlaylistContextProvider>
            <AudioPlaylistTrack.Provider
              index={0}
              track={trackData[0]!}
            >
              <AudioPlaylistTrack.Root data-testid="track-root">
                <AudioPlaylistTrack.Image data-testid="track-image" />
                <div>
                  <AudioPlaylistTrack.Title data-testid="track-title" />
                  <AudioPlaylistTrack.Author data-testid="track-author" />
                </div>
              </AudioPlaylistTrack.Root>
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
      // Get the first two tracks from trackData
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
              <AudioPlaylistTrack.Root data-testid="track-0" />
            </AudioPlaylistTrack.Provider>
            <AudioPlaylistTrack.Provider
              index={1}
              track={track1}
            >
              <AudioPlaylistTrack.Root data-testid="track-1" />
            </AudioPlaylistTrack.Provider>
          </AudioPlaylistContextProvider>
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('track-0')).not.toHaveAttribute('aria-current', 'true');
      expect(screen.getByTestId('track-1')).toHaveAttribute('aria-current', 'true');
    });
  });
});
