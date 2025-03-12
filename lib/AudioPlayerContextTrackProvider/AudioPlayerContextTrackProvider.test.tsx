import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextTrackProvider } from '@lib/AudioPlayerContextTrackProvider';

describe('AudioPlayerContextTrackProvider should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<AudioPlayerContextTrackProvider tracks={[]} />);
    expect(container).toMatchSnapshot();
  });
});
