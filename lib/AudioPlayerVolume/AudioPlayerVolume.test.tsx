import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerVolume } from '@lib/AudioPlayerVolume/AudioPlayerVolume';

describe('AudioPlayerVolumePrimitive', () => {
  test('should render children', () => {
    render(
      <AudioPlayerVolume>
        <div data-testid="child">Child content</div>
      </AudioPlayerVolume>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child content');
  });

  test('should render with custom element', () => {
    render(
      <AudioPlayerVolume
        as="section"
        data-testid="volume"
      >
        Content
      </AudioPlayerVolume>,
    );

    const element = screen.getByTestId('volume');
    expect(element.tagName).toBe('SECTION');
  });

  test('should merge className prop', () => {
    render(
      <AudioPlayerVolume
        className="custom-class"
        data-testid="volume"
      >
        Content
      </AudioPlayerVolume>,
    );

    const element = screen.getByTestId('volume');
    expect(element).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerVolume
        data-testid="volume"
        aria-label="Volume control"
      >
        Content
      </AudioPlayerVolume>,
    );

    expect(screen.getByTestId('volume')).toHaveAttribute('aria-label', 'Volume control');
  });
});
