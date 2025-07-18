import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistContainer } from '@/lib/AudioPlaylistContainer/AudioPlaylistContainer';

describe('AudioPlaylistContainer', () => {
  test('should render without context', () => {
    render(
      <AudioPlaylistContainer data-testid="audio-playlist-container">
        <div>Content</div>
      </AudioPlaylistContainer>,
    );

    const element = screen.getByTestId('audio-playlist-primitive');
    expect(element).toBeInTheDocument();
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistContainer
        data-testid="audio-playlist-primitive"
        className="custom-class"
      >
        <div>Content</div>
      </AudioPlaylistContainer>,
    );

    const element = screen.getByTestId('audio-playlist-primitive');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('flex flex-col border-slate-600 bg-slate-800');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlaylistContainer
        as="section"
        data-testid="audio-playlist-primitive"
      >
        <div>Content</div>
      </AudioPlaylistContainer>,
    );

    const element = screen.getByTestId('audio-playlist-primitive');
    expect(element.tagName.toLowerCase()).toBe('section');
  });
});
