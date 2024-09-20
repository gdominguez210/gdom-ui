

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerProgressBar } from '@lib/AudioPlayerProgressBar';

describe('AudioPlayerProgressBar should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerProgressBar />);
    expect(container).toMatchSnapshot();
  });
});
