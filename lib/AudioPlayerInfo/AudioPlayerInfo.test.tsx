import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerInfo } from '@lib/AudioPlayerInfo';

describe('AudioPlayerInfo should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<AudioPlayerInfo />);
    expect(container).toMatchSnapshot();
  });
});
