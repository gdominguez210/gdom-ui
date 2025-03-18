import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerVolume, AudioPlayerVolumePrimitive } from './AudioPlayerVolume';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider';
import { trackData } from '@lib/AudioPlayer/data';

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

describe('AudioPlayerVolume', () => {
  test('should throw error when used without providers', () => {
    expect(() => render(<AudioPlayerVolume />)).toThrow();
  });

  test('should render volume controls with correct grid layout', () => {
    render(<AudioPlayerVolume data-testid="volume" />, {
      wrapper: ({ children }) => (
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={50}
        >
          {children}
        </AudioPlayerContextProvider>
      ),
    });

    const volume = screen.getByTestId('volume');
    const button = screen.getByRole('button');
    const slider = screen.getByRole('slider');

    // Test grid layout structure
    expect(volume).toHaveClass(
      'grid',
      'grid-cols-[auto_0fr]',
      'focus-within:grid-cols-[auto_1fr]',
      'hover:grid-cols-[auto_1fr]',
      'transition-[grid-template-columns]',
      'duration-200',
    );

    // Test component composition
    expect(volume.firstElementChild).toContainElement(button);
    const sliderWrapper = volume.lastElementChild;
    expect(sliderWrapper).toContainElement(slider);
    expect(sliderWrapper).toHaveClass('overflow-hidden');
  });
});
