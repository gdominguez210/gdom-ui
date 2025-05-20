import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistExpandableContainer } from './AudioPlaylistExpandableContainer';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider/AudioPlaylistContextProvider';

describe('AudioPlaylistExpandableContainer', () => {
  test('should render with default props when visible', () => {
    render(
      <AudioPlaylistContextProvider defaultVisible={true}>
        <AudioPlaylistExpandableContainer data-testid="expandable-container">
          <div>Container Content</div>
        </AudioPlaylistExpandableContainer>
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('expandable-container');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Container Content');
    expect(element).toBeVisible();
  });

  test('should apply default styles and allow custom className', () => {
    render(
      <AudioPlaylistContextProvider defaultVisible={true}>
        <AudioPlaylistExpandableContainer
          data-testid="expandable-container"
          className="custom-class"
        >
          <div>Container Content</div>
        </AudioPlaylistExpandableContainer>
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('expandable-container');
    expect(element).toHaveClass('custom-class');
  });

  test('should not be visible when isPlaylistVisible is false', () => {
    render(
      <AudioPlaylistContextProvider>
        <AudioPlaylistExpandableContainer data-testid="expandable-container">
          <div>Container Content</div>
        </AudioPlaylistExpandableContainer>
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('expandable-container');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('opacity-0');
  });

  test('should render as a different element', () => {
    render(
      <AudioPlaylistContextProvider defaultVisible={true}>
        <AudioPlaylistExpandableContainer
          as="section"
          data-testid="expandable-container"
        >
          <div>Container Content</div>
        </AudioPlaylistExpandableContainer>
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('expandable-container');
    expect(element.tagName.toLowerCase()).toBe('section');
  });

  test('should render with children', () => {
    render(
      <AudioPlaylistContextProvider defaultVisible={true}>
        <AudioPlaylistExpandableContainer data-testid="expandable-container">
          <span data-testid="child-element">Child Element</span>
        </AudioPlaylistExpandableContainer>
      </AudioPlaylistContextProvider>,
    );

    const element = screen.getByTestId('expandable-container');
    const childElement = screen.getByTestId('child-element');

    expect(element).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Element');
  });
});
