import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayer } from '@lib/AudioPlayer';
import { AudioPlayerPrimitive } from './AudioPlayer';
import { trackData } from './data';

describe('AudioPlayer', () => {
  describe('AudioPlayerPrimitive', () => {
    test('should render without context', () => {
      render(
        <AudioPlayerPrimitive data-testid="audio-player-primitive">
          <div>Content</div>
        </AudioPlayerPrimitive>,
      );

      const element = screen.getByTestId('audio-player-primitive');
      expect(element).toBeInTheDocument();
    });

    test('should apply default styles and allow custom className', () => {
      render(
        <AudioPlayerPrimitive
          data-testid="audio-player-primitive"
          className="custom-class"
        >
          <div>Content</div>
        </AudioPlayerPrimitive>,
      );

      const element = screen.getByTestId('audio-player-base');
      expect(element).toHaveClass('custom-class');
    });

    test('should render as a different element', () => {
      render(
        <AudioPlayerPrimitive
          as="section"
          data-testid="audio-player-primitive"
        >
          <div>Content</div>
        </AudioPlayerPrimitive>,
      );

      const element = screen.getByTestId('audio-player-primitive');
      expect(element.tagName.toLowerCase()).toBe('section');
    });
  });

  describe('AudioPlayer', () => {
    test('should render with default props', () => {
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

    test('should pass default props to context provider', () => {
      render(
        <AudioPlayer
          tracks={trackData}
          defaultTrackIndex={1}
          defaultVolume={75}
          data-testid="audio-player"
        >
          <AudioPlayer.Title data-testid="title" />
        </AudioPlayer>,
      );

      const titleElement = screen.getByTestId('title');
      expect(titleElement).toHaveTextContent(trackData[1]!.title);
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
  });
});
