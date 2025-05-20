import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerVolumeSlider } from '@/lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';
import { AudioPlayerVolumeSliderPrimitive } from '@/lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSliderPrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/lib/AudioPlayer/data';

describe('AudioPlayerVolumeSliderPrimitive', () => {
  test('should render with default props', () => {
    render(
      <AudioPlayerVolumeSliderPrimitive
        value={50}
        onChange={() => {}}
        data-testid="slider"
      />,
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveValue('50');
  });

  test('should render with custom min/max values', () => {
    render(
      <AudioPlayerVolumeSliderPrimitive
        value={5}
        onChange={() => {}}
        min={0}
        max={10}
        data-testid="slider"
      />,
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '10');
    expect(slider).toHaveValue('5');
  });

  test('should render with vertical orientation', () => {
    render(
      <AudioPlayerVolumeSliderPrimitive
        value={50}
        onChange={() => {}}
        orientation="vertical"
        data-testid="slider"
      />,
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveClass(
      '[writing-mode:bt-lr]',
      '[appearance:slider-vertical]',
      'h-32',
      'w-2',
    );
  });

  test('should merge className prop', () => {
    render(
      <AudioPlayerVolumeSliderPrimitive
        value={50}
        className="custom-class"
        onChange={() => {}}
        data-testid="slider"
      />,
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveClass('custom-class');
  });

  test('should have correct ARIA attributes', () => {
    render(
      <AudioPlayerVolumeSliderPrimitive
        value={50}
        onChange={() => {}}
        data-testid="slider"
      />,
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveAttribute('role', 'slider');
    expect(slider).toHaveAttribute('aria-label', 'Volume Control');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-valuetext', 'Volume 50%');
  });

  test('should forward additional props', () => {
    const handleChange = vi.fn();
    render(
      <AudioPlayerVolumeSliderPrimitive
        value={50}
        onChange={handleChange}
        data-testid="slider"
        title="Volume control"
      />,
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveAttribute('title', 'Volume control');

    fireEvent.change(slider, { target: { value: '75' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('AudioPlayerVolumeSlider', () => {
  test('should throw error when used without providers', () => {
    expect(() => render(<AudioPlayerVolumeSlider />)).toThrow();
  });

  test('should sync with audio context volume', () => {
    render(<AudioPlayerVolumeSlider data-testid="slider" />, {
      wrapper: ({ children }) => (
        <AudioPlayerContextProvider
          tracks={trackData}
          defaultVolume={50}
        >
          {children}
        </AudioPlayerContextProvider>
      ),
    });

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveValue('50');

    fireEvent.change(slider, { target: { value: '75' } });
    expect(slider).toHaveValue('75');
  });
});
