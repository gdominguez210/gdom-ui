import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AudioPlaylistScrollableContainer } from './AudioPlaylistScrollableContainer';

describe('AudioPlaylistScrollableContainer', () => {
  it('renders children correctly', () => {
    render(
      <AudioPlaylistScrollableContainer data-testid="scrollable-container">
        <div data-testid="test-child">Test Content</div>
      </AudioPlaylistScrollableContainer>,
    );

    const container = screen.getByTestId('scrollable-container');
    const child = screen.getByTestId('test-child');

    expect(container).toBeInTheDocument();
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Test Content');
  });

  it('applies custom maxHeight when provided', () => {
    render(
      <AudioPlaylistScrollableContainer
        maxHeight="200px"
        data-testid="scrollable-container"
      >
        <div>Test Content</div>
      </AudioPlaylistScrollableContainer>,
    );

    const container = screen.getByTestId('scrollable-container');
    expect(container).toHaveStyle('max-height: 200px');
  });

  it('applies default maxHeight when not provided', () => {
    render(
      <AudioPlaylistScrollableContainer data-testid="scrollable-container">
        <div>Test Content</div>
      </AudioPlaylistScrollableContainer>,
    );

    const container = screen.getByTestId('scrollable-container');
    expect(container).toHaveStyle('max-height: 300px');
  });

  it('merges custom className with default classes', () => {
    render(
      <AudioPlaylistScrollableContainer
        className="custom-class"
        data-testid="scrollable-container"
      >
        <div>Test Content</div>
      </AudioPlaylistScrollableContainer>,
    );

    const container = screen.getByTestId('scrollable-container');
    expect(container).toHaveClass('overflow-y-auto');
    expect(container).toHaveClass('custom-class');
  });

  it('renders as a custom element when "as" prop is provided', () => {
    render(
      <AudioPlaylistScrollableContainer
        as="section"
        data-testid="scrollable-container"
      >
        <div>Test Content</div>
      </AudioPlaylistScrollableContainer>,
    );

    const container = screen.getByTestId('scrollable-container');
    expect(container.tagName).toBe('SECTION');
  });
});
