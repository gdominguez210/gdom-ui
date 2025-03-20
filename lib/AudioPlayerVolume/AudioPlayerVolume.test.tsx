import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerVolumePrimitive } from './AudioPlayerVolume';

describe('AudioPlayerVolumePrimitive', () => {
  test('should render children', () => {
    render(
      <AudioPlayerVolumePrimitive>
        <div data-testid="child">Child content</div>
      </AudioPlayerVolumePrimitive>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Child content');
  });

  test('should render with custom element', () => {
    render(
      <AudioPlayerVolumePrimitive
        as="section"
        data-testid="volume"
      >
        Content
      </AudioPlayerVolumePrimitive>,
    );

    const element = screen.getByTestId('volume');
    expect(element.tagName).toBe('SECTION');
  });

  test('should merge className prop', () => {
    render(
      <AudioPlayerVolumePrimitive
        className="custom-class"
        data-testid="volume"
      >
        Content
      </AudioPlayerVolumePrimitive>,
    );

    const element = screen.getByTestId('volume');
    expect(element).toHaveClass('items-center', 'gap-3', 'custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerVolumePrimitive
        data-testid="volume"
        aria-label="Volume control"
      >
        Content
      </AudioPlayerVolumePrimitive>,
    );

    expect(screen.getByTestId('volume')).toHaveAttribute('aria-label', 'Volume control');
  });
});
