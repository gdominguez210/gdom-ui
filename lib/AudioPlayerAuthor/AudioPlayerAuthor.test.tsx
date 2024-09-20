

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerAuthor } from '@lib/AudioPlayerAuthor';

describe('AudioPlayerAuthor should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerAuthor />);
    expect(container).toMatchSnapshot();
  });
});
