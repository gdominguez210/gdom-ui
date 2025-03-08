import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerProgressBar, AudioPlayerProgressBarBase } from './AudioPlayerProgressBar';
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

describe('AudioPlayerProgressBar', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerProgressBar />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR.STATE);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerProgressBar
            className="custom-class"
            data-testid="progress"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('progress')).toHaveClass('custom-class');
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerProgressBar
            data-testid="progress"
            aria-label="Progress control"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('progress')).toHaveAttribute('aria-label', 'Progress control');
    });

    test('should update audio currentTime on slider change', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioElement />
          <AudioPlayerProgressBar data-testid="progress" />
        </AudioPlayerContextProvider>,
      );

      const slider = screen.getByRole('slider');
      const audio = screen.getByTestId('audio') as HTMLAudioElement;

      fireEvent.change(slider, { target: { value: '50' } });
      expect(audio.currentTime).toBe(50);
    });
  });
});

describe('AudioPlayerProgressBarBase', () => {
  test('should call onChange when slider changes', () => {
    const handleChange = vi.fn();

    render(
      <AudioPlayerProgressBarBase
        data-testid="progress"
        onChange={handleChange}
      />,
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '90' } });

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerProgressBarBase
        className="custom-class"
        data-testid="progress"
        onChange={() => {}}
      />,
    );

    expect(screen.getByTestId('progress')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerProgressBarBase
        data-testid="progress"
        onChange={() => {}}
        aria-label="Progress control"
      />,
    );

    expect(screen.getByTestId('progress')).toHaveAttribute('aria-label', 'Progress control');
  });
});
