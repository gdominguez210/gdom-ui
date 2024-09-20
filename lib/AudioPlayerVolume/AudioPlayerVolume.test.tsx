

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume';

describe('AudioPlayerVolume should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerVolume />);
    expect(container).toMatchSnapshot();
  });
});
