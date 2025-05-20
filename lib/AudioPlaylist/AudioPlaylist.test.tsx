import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistCompoundComponent as AudioPlaylist } from '@/lib/AudioPlaylist/namespace';
import { AudioPlaylist as AudioPlaylistPrimitive } from '@/lib/AudioPlaylist/AudioPlaylist';
import { trackData } from '@/lib/AudioPlayer/data';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

describe('AudioPlaylist', () => {
  describe('AudioPlaylistPrimitive', () => {
    test('should render without context', () => {
      render(
        <AudioPlaylistPrimitive data-testid="audio-playlist-primitive">
          <div>Content</div>
        </AudioPlaylistPrimitive>,
      );

      const element = screen.getByTestId('audio-playlist-primitive');
      expect(element).toBeInTheDocument();
    });

    test('should apply default styles and allow custom className', () => {
      render(
        <AudioPlaylistPrimitive
          data-testid="audio-playlist-primitive"
          className="custom-class"
        >
          <div>Content</div>
        </AudioPlaylistPrimitive>,
      );

      const element = screen.getByTestId('audio-playlist-primitive');
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('flex flex-col border-slate-600 bg-slate-800');
    });

    test('should render as a different element', () => {
      render(
        <AudioPlaylistPrimitive
          as="section"
          data-testid="audio-playlist-primitive"
        >
          <div>Content</div>
        </AudioPlaylistPrimitive>,
      );

      const element = screen.getByTestId('audio-playlist-primitive');
      expect(element.tagName.toLowerCase()).toBe('section');
    });
  });

  describe('AudioPlaylist', () => {
    test('should render with default props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlaylist.Root data-testid="audio-playlist">
            <div>Content</div>
          </AudioPlaylist.Root>
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
              <AudioPlaylist.Root>
                <AudioPlaylist.Header data-testid="header">
                  <span>Playlist</span>
                  <AudioPlaylist.Dismiss data-testid="dismiss" />
                </AudioPlaylist.Header>
                <AudioPlaylist.Tracks data-testid="tracks" />
              </AudioPlaylist.Root>
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
});
