import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextTimeProvider } from '@lib/AudioPlayerContextTimeProvider';

describe('AudioPlayerContextTimeProvider should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<AudioPlayerContextTimeProvider />);
    expect(container).toMatchSnapshot();
  });
});
