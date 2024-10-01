import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { AudioPlayerInfo } from '@lib/AudioPlayerInfo';

describe('AudioPlayerInfo should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerInfo>Track Info</AudioPlayerInfo>);
    expect(container).toMatchSnapshot();
  });

  test('allow the user to add a className', () => {
    render(
      <AudioPlayerInfo
        className="gap-6"
        data-testid="audio-player-info"
      >
        Track Info
      </AudioPlayerInfo>,
    );

    const element = screen.getByTestId('audio-player-info');

    expect(element).toHaveClass('gap-6');
  });
});
