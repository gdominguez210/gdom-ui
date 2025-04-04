import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistControlToggle } from './AudioPlaylistControlToggle';
import { AudioPlaylistContextProvider } from '@lib/AudioPlaylistContextProvider/AudioPlaylistContextProvider';

describe('AudioPlaylistControlToggle', () => {
  test('should render with default props', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistControlToggle data-testid="control-toggle" />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('control-toggle');
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('button');
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistControlToggle
          data-testid="control-toggle"
          className="custom-class"
        />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('control-toggle');
    expect(element).toHaveClass('custom-class');
  });

  test('should have correct ARIA attributes', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistControlToggle data-testid="control-toggle" />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('control-toggle');
    expect(element).toHaveAttribute('aria-label', 'Show playlist');
    expect(element).toHaveAttribute('type', 'button');
  });

  test('should handle click events correctly', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistControlToggle data-testid="control-toggle" />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('control-toggle');

    expect(() => {
      fireEvent.click(element);
    }).not.toThrow();

    expect(element).toHaveAttribute('aria-label', 'Hide playlist');
  });
});
