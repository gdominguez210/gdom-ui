import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistTracks } from './AudioPlaylistTracks';

describe('AudioPlaylistTracks', () => {
  test('should render with default props', () => {
    render(
      <AudioPlaylistTracks data-testid="tracks">
        <div>Track List</div>
      </AudioPlaylistTracks>,
    );

    const element = screen.getByTestId('tracks');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Track List');
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistTracks
        data-testid="tracks"
        className="custom-class"
      >
        <div>Track List</div>
      </AudioPlaylistTracks>,
    );

    const element = screen.getByTestId('tracks');
    expect(element).toHaveClass('custom-class');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlaylistTracks
        as="div"
        data-testid="tracks"
      >
        <div>Track List</div>
      </AudioPlaylistTracks>,
    );

    const element = screen.getByTestId('tracks');
    expect(element.tagName.toLowerCase()).toBe('div');
  });

  test('should render with children', () => {
    render(
      <AudioPlaylistTracks data-testid="tracks">
        <span data-testid="child-element">Child Element</span>
      </AudioPlaylistTracks>,
    );

    const element = screen.getByTestId('tracks');
    const childElement = screen.getByTestId('child-element');

    expect(element).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Element');
  });
});
