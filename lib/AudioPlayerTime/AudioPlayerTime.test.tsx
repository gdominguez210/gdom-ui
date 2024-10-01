import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import {
  AUDIO_PLAYER_CONTEXT_ERROR,
  AudioPlayerContextProviderWithTrackData as AudioWrapper,
} from '@lib/AudioPlayerContextProvider/data';
import { AudioPlayerTime } from '@lib/AudioPlayerTime';

describe('AudioPlayerTime should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerTime />, { wrapper: AudioWrapper });
    expect(container).toMatchSnapshot();
  });

  test('throw an error when not used in AudioPlayerContextProvider', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    await waitFor(() =>
      expect(() => render(<AudioPlayerTime />)).toThrow(AUDIO_PLAYER_CONTEXT_ERROR),
    );
    vi.restoreAllMocks();
  });

  test('allow the user to add a className', () => {
    render(
      <AudioPlayerTime
        className="text-md"
        data-testid="audio-player-time"
      />,
      { wrapper: AudioWrapper },
    );

    const element = screen.getByTestId('audio-player-time');

    expect(element).toHaveClass('text-md');
  });
});
