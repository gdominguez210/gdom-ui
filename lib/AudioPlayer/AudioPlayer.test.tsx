import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerCompoundComponent as AudioPlayer } from '@/lib/AudioPlayer/namespace';
import { AudioPlayer as AudioPlayerPrimitive } from '@/lib/AudioPlayer/AudioPlayer';
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

      const element = screen.getByTestId('audio-player-primitive');
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
        <AudioPlayer.Provider tracks={trackData}>
          <AudioPlayer.Root data-testid="audio-player">
            <div>Content</div>
          </AudioPlayer.Root>
        </AudioPlayer.Provider>,
      );

      const element = screen.getByTestId('audio-player');
      expect(element).toBeInTheDocument();
    });

    test('should render all compound components', () => {
      render(
        <AudioPlayer.Provider tracks={trackData}>
          <AudioPlayer.Root>
            <AudioPlayer.Info data-testid="info">
              <AudioPlayer.Image data-testid="image" />
              <AudioPlayer.Title data-testid="title" />
              <AudioPlayer.Author data-testid="author" />
            </AudioPlayer.Info>
            <AudioPlayer.Controls data-testid="controls">
              <AudioPlayer.ControlAudio data-testid="control-audio" />
              <AudioPlayer.ControlPlay data-testid="control-play" />
              <AudioPlayer.ControlPrevious data-testid="control-previous" />
              <AudioPlayer.ControlNext data-testid="control-next" />
              <AudioPlayer.ControlShuffle data-testid="control-shuffle" />
              <AudioPlayer.ControlLoop data-testid="control-loop" />
            </AudioPlayer.Controls>
            <AudioPlayer.ProgressBar data-testid="progress" />
            <AudioPlayer.Time data-testid="time" />
            <AudioPlayer.Volume data-testid="volume">
              <AudioPlayer.VolumeButton data-testid="volume-button" />
              <AudioPlayer.VolumeSlider data-testid="volume-slider" />
            </AudioPlayer.Volume>
          </AudioPlayer.Root>
        </AudioPlayer.Provider>,
      );

      expect(screen.getByTestId('info')).toBeInTheDocument();
      expect(screen.getByTestId('image')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('author')).toBeInTheDocument();
      expect(screen.getByTestId('controls')).toBeInTheDocument();
      expect(screen.getByTestId('control-audio')).toBeInTheDocument();
      expect(screen.getByTestId('control-play')).toBeInTheDocument();
      expect(screen.getByTestId('control-previous')).toBeInTheDocument();
      expect(screen.getByTestId('control-next')).toBeInTheDocument();
      expect(screen.getByTestId('control-shuffle')).toBeInTheDocument();
      expect(screen.getByTestId('control-loop')).toBeInTheDocument();
      expect(screen.getByTestId('progress')).toBeInTheDocument();
      expect(screen.getByTestId('time')).toBeInTheDocument();
      expect(screen.getByTestId('volume')).toBeInTheDocument();
      expect(screen.getByTestId('volume-button')).toBeInTheDocument();
      expect(screen.getByTestId('volume-slider')).toBeInTheDocument();
    });
  });
});
