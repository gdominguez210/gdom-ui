import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistHeader } from './AudioPlaylistHeader';

describe('AudioPlaylistHeader', () => {
  test('should render with default props', () => {
    render(<AudioPlaylistHeader data-testid="header">Header Content</AudioPlaylistHeader>);

    const element = screen.getByTestId('header');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Header Content');
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistHeader
        data-testid="header"
        className="custom-class"
      >
        Header Content
      </AudioPlaylistHeader>,
    );

    const element = screen.getByTestId('header');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlaylistHeader
        as="section"
        data-testid="header"
      >
        Header Content
      </AudioPlaylistHeader>,
    );

    const element = screen.getByTestId('header');
    expect(element.tagName.toLowerCase()).toBe('section');
  });

  test('should render with children', () => {
    render(
      <AudioPlaylistHeader data-testid="header">
        <span data-testid="child-element">Child Element</span>
      </AudioPlaylistHeader>,
    );

    const element = screen.getByTestId('header');
    const childElement = screen.getByTestId('child-element');

    expect(element).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Element');
  });
});
