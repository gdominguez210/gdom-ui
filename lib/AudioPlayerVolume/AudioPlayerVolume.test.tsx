import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerVolume } from './AudioPlayerVolume';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_ERROR } from '@lib/AudioPlayerContextProvider/data';
import { trackData } from '@lib/AudioPlayer/data';
import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider';

function AudioElement() {
  const { audioRef } = useAudioPlayerContextState();
  return (
    <audio
      ref={audioRef}
      data-testid="audio"
    />
  );
}

describe('AudioPlayerVolume', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerVolume />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render volume slider with default value', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute('type', 'range');
      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '100');
      expect(slider).toHaveValue('50'); // Default volume
    });

    test('should render volume slider with custom default value', () => {
      render(
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={75}
        >
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByRole('slider')).toHaveValue('75');
    });

    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerVolume
            className="custom-class"
            data-testid="volume"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('volume')).toHaveClass('custom-class');
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerVolume
            data-testid="volume"
            aria-label="Volume control"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('volume')).toHaveAttribute('aria-label', 'Volume control');
    });

    test('should update volume on slider change', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '75' } });

      expect(slider).toHaveValue('75');
    });

    test('should toggle mute on button click', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioElement />
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      const muteButton = screen.getByRole('button');
      const audioElement = screen.getByTestId('audio') as HTMLAudioElement;
      const slider = screen.getByRole('slider');

      expect(audioElement.muted).toBe(false);
      expect(slider).toHaveValue('50');

      fireEvent.click(muteButton);
      expect(audioElement.muted).toBe(true);
      expect(slider).toHaveValue('50');

      fireEvent.click(muteButton);
      expect(audioElement.muted).toBe(false);
      expect(slider).toHaveValue('50');
    });

    test('should show volume-up icon when volume >= 40', () => {
      render(
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={75}
        >
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('volume-up-icon')).toBeInTheDocument();
    });

    test('should show volume-down icon when volume between 5 and 40', () => {
      render(
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={35}
        >
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('volume-down-icon')).toBeInTheDocument();
    });

    test('should show volume-mute icon when volume < 5', () => {
      render(
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={0}
        >
          <AudioPlayerVolume data-testid="volume" />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('volume-mute-icon')).toBeInTheDocument();
    });
  });
});
