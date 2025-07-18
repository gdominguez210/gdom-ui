import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTrackContainerPrimitive } from '@/lib/AudioPlaylistTrackContainer/AudioPlaylistTrackContainerPrimitive';

describe('AudioPlaylistTrackContainerPrimitive', () => {
  test('should render without context', () => {
    render(
      <AudioPlaylistTrackContainerPrimitive data-testid="track-primitive">
        <div>Content</div>
      </AudioPlaylistTrackContainerPrimitive>,
    );

    const element = screen.getByTestId('track-primitive');
    expect(element).toBeInTheDocument();
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistTrackContainerPrimitive
        data-testid="track-primitive"
        className="custom-class"
      >
        <div>Content</div>
      </AudioPlaylistTrackContainerPrimitive>,
    );

    const element = screen.getByTestId('track-primitive');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlaylistTrackContainerPrimitive
        as="div"
        data-testid="track-primitive"
      >
        <div>Content</div>
      </AudioPlaylistTrackContainerPrimitive>,
    );

    const element = screen.getByTestId('track-primitive');
    expect(element.tagName.toLowerCase()).toBe('div');
  });
});
