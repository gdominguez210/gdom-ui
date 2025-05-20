import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerVolumeButton } from '@/lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerVolumeButtonPrimitive } from '@/lib/AudioPlayerVolumeButton/AudioPlayerVolumeButtonPrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/lib/AudioPlayer/data';

describe('AudioPlayerVolumeButtonPrimitive', () => {
  test('should render with icon', () => {
    render(
      <AudioPlayerVolumeButtonPrimitive
        iconName="volume-up-fill"
        title="Volume High"
        data-testid="button"
      />,
    );

    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTitle('Volume High')).toBeInTheDocument();
  });

  test('should merge className prop', () => {
    render(
      <AudioPlayerVolumeButtonPrimitive
        iconName="volume-up-fill"
        title="Volume High"
        className="custom-class"
        data-testid="button"
      />,
    );

    const element = screen.getByTestId('button');
    expect(element).toHaveClass('text-2xl', 'custom-class');
  });

  test('should forward additional props', () => {
    const handleClick = vi.fn();
    render(
      <AudioPlayerVolumeButtonPrimitive
        iconName="volume-up-fill"
        title="Volume High"
        data-testid="button"
        onClick={handleClick}
        aria-label="Volume control"
      />,
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('aria-label', 'Volume control');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('AudioPlayerVolumeButton', () => {
  test('should throw error when used without providers', () => {
    expect(() => render(<AudioPlayerVolumeButton />)).toThrow();
  });

  describe('volume icon states', () => {
    test('should show high volume icon when volume >= 40', () => {
      render(<AudioPlayerVolumeButton data-testid="button" />, {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={50}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      });

      expect(screen.getByTestId('button')).toHaveAttribute('title', 'Volume High');
    });

    test('should show low volume icon when 5 <= volume < 40', () => {
      render(<AudioPlayerVolumeButton data-testid="button" />, {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={20}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      });

      expect(screen.getByTestId('button')).toHaveAttribute('title', 'Volume Low');
    });

    test('should show muted icon when volume < 5', () => {
      render(<AudioPlayerVolumeButton data-testid="button" />, {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={0}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      });

      expect(screen.getByTestId('button')).toHaveAttribute('title', 'Volume Muted');
    });

    test('should show muted icon when muted regardless of volume', () => {
      render(<AudioPlayerVolumeButton data-testid="button" />, {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={100}
            defaultMute={true}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      });

      expect(screen.getByTestId('button')).toHaveAttribute('title', 'Volume Muted');
    });
  });

  test('should toggle mute state on click', () => {
    render(<AudioPlayerVolumeButton data-testid="button" />, {
      wrapper: ({ children }) => (
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={50}
        >
          {children}
        </AudioPlayerContextProvider>
      ),
    });

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('title', 'Volume High');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('aria-label', 'Mute');

    fireEvent.click(button);
    expect(button).toHaveAttribute('title', 'Volume Muted');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('aria-label', 'Unmute');

    fireEvent.click(button);
    expect(button).toHaveAttribute('title', 'Volume High');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('aria-label', 'Mute');
  });

  test('should call provided onClick handler', () => {
    const handleClick = vi.fn();
    render(
      <AudioPlayerVolumeButton
        onClick={handleClick}
        data-testid="button"
      />,
      {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={50}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      },
    );

    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should have correct ARIA attributes', () => {
    render(<AudioPlayerVolumeButton data-testid="button" />, {
      wrapper: ({ children }) => (
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={50}
        >
          {children}
        </AudioPlayerContextProvider>
      ),
    });

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('aria-label', 'Mute');
    expect(button).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Unmute');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('should merge className prop', () => {
    render(
      <AudioPlayerVolumeButton
        className="custom-class"
        data-testid="button"
      />,
      {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={50}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      },
    );

    expect(screen.getByTestId('button')).toHaveClass('text-2xl', 'custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerVolumeButton
        data-testid="button"
        disabled
        aria-describedby="tooltip"
      />,
      {
        wrapper: ({ children }) => (
          <AudioPlayerContextProvider
            tracks={trackData}
            defaultVolume={50}
          >
            {children}
          </AudioPlayerContextProvider>
        ),
      },
    );

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-describedby', 'tooltip');
  });
});
