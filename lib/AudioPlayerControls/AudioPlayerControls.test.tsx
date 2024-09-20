

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerControls } from '@lib/AudioPlayerControls';

describe('AudioPlayerControls should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerControls />);
    expect(container).toMatchSnapshot();
  });
});
