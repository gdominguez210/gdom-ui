import { screen, render, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { trackData } from '@lib/AudioPlayer/data';
import {
  AudioPlayerContextProviderWithTrackData as AudioWrapper,
  AUDIO_PLAYER_CONTEXT_ERROR,
} from '@lib/AudioPlayerContextProvider/data';

describe('AudioPlayerAuthor should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<AudioPlayerAuthor />, { wrapper: AudioWrapper });

    expect(container).toMatchSnapshot();
  });

  test('should throw an error when not used in AudioPlayerContextProvider', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    await waitFor(() =>
      expect(() => render(<AudioPlayerAuthor />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR),
    );
    vi.restoreAllMocks();
  });

  test("display a track's author", () => {
    render(<AudioPlayerAuthor data-testid="audio-player-author" />, { wrapper: AudioWrapper });

    const element = screen.getByTestId('audio-player-author');

    expect(element).toHaveTextContent(trackData[0]?.author as string);
  });

  test('allow the user to change the returned element type', () => {
    render(
      <AudioPlayerAuthor
        as="span"
        data-testid="audio-player-author"
      />,
      { wrapper: AudioWrapper },
    );

    const element = screen.getByTestId('audio-player-author');

    expect(element.nodeName.toLowerCase()).toBe('span');
  });

  test('allow the user to add a className', () => {
    render(
      <AudioPlayerAuthor
        className="text-md"
        data-testid="audio-player-author"
      />,
      { wrapper: AudioWrapper },
    );

    const element = screen.getByTestId('audio-player-author');

    expect(element).toHaveClass('text-md');
  });
});
