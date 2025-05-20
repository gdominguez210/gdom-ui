import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AudioPlaylistContextProvider } from '@/lib/AudioPlaylistContextProvider/AudioPlaylistContextProvider';
import { useAudioPlaylistContext } from '@/lib/AudioPlaylistContextProvider/useAudioPlaylistContext';
import type { ComponentPropsWithRef } from 'react';

function TestComponent(props: ComponentPropsWithRef<'div'>) {
  const { isPlaylistVisible, togglePlaylist, id } = useAudioPlaylistContext();

  return (
    <div
      id={id}
      {...props}
    >
      <div data-testid="visibility-status">{isPlaylistVisible ? 'visible' : 'hidden'}</div>
      <button
        data-testid="toggle-button"
        onClick={() => togglePlaylist()}
      >
        Toggle
      </button>
    </div>
  );
}

describe('AudioPlaylistContextProvider', () => {
  test('should provide default visibility state (hidden)', () => {
    render(
      <AudioPlaylistContextProvider>
        <TestComponent />
      </AudioPlaylistContextProvider>,
    );

    const status = screen.getByTestId('visibility-status');
    expect(status).toHaveTextContent('hidden');
  });

  test('should provide initial visible state when defaultVisible is true', () => {
    render(
      <AudioPlaylistContextProvider defaultVisible={true}>
        <TestComponent />
      </AudioPlaylistContextProvider>,
    );

    const status = screen.getByTestId('visibility-status');
    expect(status).toHaveTextContent('visible');
  });

  test('should toggle visibility when togglePlaylist is called', () => {
    render(
      <AudioPlaylistContextProvider>
        <TestComponent />
      </AudioPlaylistContextProvider>,
    );

    const status = screen.getByTestId('visibility-status');
    const toggleButton = screen.getByTestId('toggle-button');

    expect(status).toHaveTextContent('hidden');

    fireEvent.click(toggleButton);
    expect(status).toHaveTextContent('visible');

    fireEvent.click(toggleButton);
    expect(status).toHaveTextContent('hidden');
  });

  test('should use custom id when provided', () => {
    const customId = 'custom-playlist-id';

    render(
      <AudioPlaylistContextProvider id={customId}>
        <TestComponent data-testid="test-component" />
      </AudioPlaylistContextProvider>,
    );

    const testComponent = screen.getByTestId('test-component');
    expect(testComponent).toHaveAttribute('id', customId);
  });

  test('should render children correctly', () => {
    render(
      <AudioPlaylistContextProvider>
        <div data-testid="child-element">Child Content</div>
      </AudioPlaylistContextProvider>,
    );

    const childElement = screen.getByTestId('child-element');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Content');
  });
});
