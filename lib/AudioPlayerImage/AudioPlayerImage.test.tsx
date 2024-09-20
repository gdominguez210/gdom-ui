import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerImage } from '@lib/AudioPlayerImage';

describe('AudioPlayerImage should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerImage />);
    expect(container).toMatchSnapshot();
  });
});
