import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import {
  AudioPlayerControlAudio,
  AudioPlayerControlAudioPrimitive,
} from './AudioPlayerControlAudio';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { AUDIO_PLAYER_CONTEXT_REFS_ERROR } from '@lib/AudioPlayerContextRefsProvider/AudioPlayerContextRefs';
import { trackData } from '@lib/AudioPlayer/data';

describe('AudioPlayerControlAudio', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerControlAudio />)).toThrow(AUDIO_PLAYER_CONTEXT_REFS_ERROR);
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should render audio element with current track source', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlAudio data-testid="audio" />
        </AudioPlayerContextProvider>,
      );

      const audio = screen.getByTestId('audio') as HTMLAudioElement;
      expect(audio).toBeInTheDocument();
      expect(audio.tagName.toLowerCase()).toBe('audio');
      expect(audio).toHaveAttribute('src', trackData[0]?.src);
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerControlAudio
            data-testid="audio"
            preload="auto"
          />
        </AudioPlayerContextProvider>,
      );

      const audio = screen.getByTestId('audio');
      expect(audio).toHaveAttribute('preload', 'auto');
    });
  });
});

describe('AudioPlayerControlAudioPrimitive', () => {
  test('should render audio element with provided source', () => {
    const src = 'test.mp3';
    render(
      <AudioPlayerControlAudioPrimitive
        data-testid="audio"
        src={src}
      />,
    );

    const audio = screen.getByTestId('audio') as HTMLAudioElement;
    expect(audio).toBeInTheDocument();
    expect(audio.tagName.toLowerCase()).toBe('audio');
    expect(audio).toHaveAttribute('src', src);
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerControlAudioPrimitive
        data-testid="audio"
        preload="auto"
      />,
    );

    const audio = screen.getByTestId('audio');
    expect(audio).toHaveAttribute('preload', 'auto');
  });
});
