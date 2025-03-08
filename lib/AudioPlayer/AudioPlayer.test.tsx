import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayer, AudioPlayerBase } from '@lib/AudioPlayer';
import { trackData } from './data';

describe('AudioPlayer', () => {
  describe('AudioPlayerBase', () => {
    test('should render without context', () => {
      render(
        <AudioPlayerBase data-testid="audio-player-base">
          <div>Content</div>
        </AudioPlayerBase>,
      );

      const element = screen.getByTestId('audio-player-base');
      expect(element).toBeInTheDocument();
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerBase
          data-testid="audio-player-base"
          className="custom-class"
        >
          <div>Content</div>
        </AudioPlayerBase>,
      );

      const element = screen.getByTestId('audio-player-base');
      expect(element).toHaveClass('custom-class');
    });

    test('should render as a different element', () => {
      render(
        <AudioPlayerBase
          as="section"
          data-testid="audio-player-base"
        >
          <div>Content</div>
        </AudioPlayerBase>,
      );

      const element = screen.getByTestId('audio-player-base');
      expect(element.tagName.toLowerCase()).toBe('section');
    });
  });

  describe('AudioPlayer', () => {
    test('should render with context provider', () => {
      render(
        <AudioPlayer
          tracks={trackData}
          data-testid="audio-player"
        >
          <div>Content</div>
        </AudioPlayer>,
      );

      const element = screen.getByTestId('audio-player');
      expect(element).toBeInTheDocument();
    });

    test('should pass defaultTrackIndex to context provider', () => {
      const defaultTrackIndex = 1;
      const track = trackData[defaultTrackIndex];

      if (!track) {
        throw new Error('Track data not found at index');
      }

      render(
        <AudioPlayer
          tracks={trackData}
          defaultTrackIndex={defaultTrackIndex}
          data-testid="audio-player"
        >
          <AudioPlayer.Title data-testid="title" />
        </AudioPlayer>,
      );

      const titleElement = screen.getByTestId('title');
      expect(titleElement).toHaveTextContent(track.title);
    });

    test('should render all compound components', () => {
      render(
        <AudioPlayer tracks={trackData}>
          <AudioPlayer.Info data-testid="info">
            <AudioPlayer.Image data-testid="image" />
            <AudioPlayer.Title data-testid="title" />
            <AudioPlayer.Author data-testid="author" />
          </AudioPlayer.Info>
          <AudioPlayer.Controls data-testid="controls" />
          <AudioPlayer.ProgressBar data-testid="progress" />
          <AudioPlayer.Time data-testid="time" />
          <AudioPlayer.Volume data-testid="volume" />
        </AudioPlayer>,
      );

      expect(screen.getByTestId('info')).toBeInTheDocument();
      expect(screen.getByTestId('image')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('author')).toBeInTheDocument();
      expect(screen.getByTestId('controls')).toBeInTheDocument();
      expect(screen.getByTestId('progress')).toBeInTheDocument();
      expect(screen.getByTestId('time')).toBeInTheDocument();
      expect(screen.getByTestId('volume')).toBeInTheDocument();
    });

    test('should apply containerRef from context', () => {
      render(
        <AudioPlayer
          tracks={trackData}
          data-testid="audio-player"
        >
          <div>Content</div>
        </AudioPlayer>,
      );

      const element = screen.getByTestId('audio-player');
      expect(element).toHaveAttribute('tabindex', '-1');
    });
  });
});
