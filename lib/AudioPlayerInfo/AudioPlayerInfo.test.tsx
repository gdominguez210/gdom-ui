import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlayerInfo } from './AudioPlayerInfo';

describe('AudioPlayerInfo', () => {
  test('should render children', () => {
    render(
      <AudioPlayerInfo data-testid="info">
        <div>Track Title</div>
        <div>Track Author</div>
      </AudioPlayerInfo>,
    );

    const info = screen.getByTestId('info');
    expect(info).toHaveTextContent('Track Title');
    expect(info).toHaveTextContent('Track Author');
  });

  test('should allow custom className', () => {
    render(
      <AudioPlayerInfo
        className="custom-class"
        data-testid="info"
      >
        Track Info
      </AudioPlayerInfo>,
    );

    expect(screen.getByTestId('info')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerInfo
        data-testid="info"
        aria-label="Track information"
      >
        Track Info
      </AudioPlayerInfo>,
    );

    expect(screen.getByTestId('info')).toHaveAttribute('aria-label', 'Track information');
  });
});
