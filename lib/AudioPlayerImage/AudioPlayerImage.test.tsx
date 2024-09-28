import { screen, render, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerImage } from '@lib/AudioPlayerImage/AudioPlayerImage';
import { trackData } from '@lib/AudioPlayer/data';
import {
  AudioPlayerContextProviderWithTrackData as AudioWrapper,
  AUDIO_PLAYER_CONTEXT_ERROR,
} from '@lib/AudioPlayerContextProvider/data';
import {
  AudioPlayerContextProvider,
  type AudioTrackData,
} from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

describe('AudioPlayerImage should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<AudioPlayerImage />, { wrapper: AudioWrapper });

    expect(container).toMatchSnapshot();
  });

  test('should throw an error when not used in AudioPlayerContextProvider', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    await waitFor(() =>
      expect(() => render(<AudioPlayerImage />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR),
    );
    vi.restoreAllMocks();
  });

  test("display a track's thumbnail if it exists", () => {
    render(<AudioPlayerImage data-testid="audio-player-image" />, { wrapper: AudioWrapper });

    const element = screen.getByTestId('audio-player-image');

    expect(element.firstChild).toHaveAttribute('src', trackData[0]?.thumbnail as string);
  });

  test('display a placeholder icon if a thumbnail does not exist', () => {
    const track = { ...trackData[0] } as AudioTrackData;
    delete track.thumbnail;

    render(
      <AudioPlayerContextProvider tracks={[track]}>
        <AudioPlayerImage data-testid="audio-player-image" />
      </AudioPlayerContextProvider>,
    );

    const element = screen.getByTestId('audio-player-image');

    expect(element.firstChild?.nodeName.toLowerCase()).toBe('div');
  });

  test('allow the user to add a className', () => {
    render(
      <AudioPlayerImage
        className="h-26 w-26"
        data-testid="audio-player-image"
      />,
      { wrapper: AudioWrapper },
    );

    const element = screen.getByTestId('audio-player-image');

    expect(element).toHaveClass('h-26 w-26');
  });
});
