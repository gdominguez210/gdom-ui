import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerControls } from '@/lib/AudioPlayerControls/AudioPlayerControls';

describe('AudioPlayerControls', () => {
  test('should render children', () => {
    render(
      <AudioPlayerControls data-testid="controls">
        <button>Test Button</button>
      </AudioPlayerControls>,
    );

    expect(screen.getByTestId('controls')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  test('should allow custom className', () => {
    render(
      <AudioPlayerControls
        className="custom-class"
        data-testid="controls"
      >
        <button>Test Button</button>
      </AudioPlayerControls>,
    );

    expect(screen.getByTestId('controls')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerControls
        data-testid="controls"
        aria-label="Audio controls"
      >
        <button>Test Button</button>
      </AudioPlayerControls>,
    );

    expect(screen.getByTestId('controls')).toHaveAttribute('aria-label', 'Audio controls');
  });
});
