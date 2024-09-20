

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerTitle } from '@lib/AudioPlayerTitle';

describe('AudioPlayerTitle should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerTitle />);
    expect(container).toMatchSnapshot();
  });
});
