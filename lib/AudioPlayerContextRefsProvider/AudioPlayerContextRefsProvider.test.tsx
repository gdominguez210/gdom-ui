import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextRefsProvider } from '@lib/AudioPlayerContextRefsProvider';

describe('AudioPlayerContextAudioProvider should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<AudioPlayerContextRefsProvider />);
    expect(container).toMatchSnapshot();
  });
});
