

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerTime } from '@lib/AudioPlayerTime';

describe('AudioPlayerTime should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerTime />);
    expect(container).toMatchSnapshot();
  });
});
