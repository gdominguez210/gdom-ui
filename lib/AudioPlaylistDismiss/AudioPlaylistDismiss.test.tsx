import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistDismiss } from './AudioPlaylistDismiss';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider/AudioPlaylistContextProvider';

describe('AudioPlaylistDismiss', () => {
  test('should render with default props', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistDismiss data-testid="dismiss" />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('dismiss');
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('button');
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistDismiss
          data-testid="dismiss"
          className="custom-class"
        />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('dismiss');
    expect(element).toHaveClass('custom-class');
  });

  test('should have correct ARIA attributes', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistDismiss data-testid="dismiss" />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('dismiss');
    expect(element).toHaveAttribute('aria-label', 'Close playlist');
    expect(element).toHaveAttribute('type', 'button');
  });

  test('should handle click events correctly', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistDismiss data-testid="dismiss" />
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('dismiss');

    expect(() => {
      fireEvent.click(element);
    }).not.toThrow();
  });
});
