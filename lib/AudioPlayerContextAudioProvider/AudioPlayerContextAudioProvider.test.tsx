import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerContextAudioProvider } from '@lib/AudioPlayerContextAudioProvider';

describe('AudioPlayerContextAudioProvider should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<AudioPlayerContextAudioProvider />);
    expect(container).toMatchSnapshot();
  });
});
