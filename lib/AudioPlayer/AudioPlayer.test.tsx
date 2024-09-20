

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayer } from '@lib/AudioPlayer';

describe('AudioPlayer should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayer />);
    expect(container).toMatchSnapshot();
  });
});
