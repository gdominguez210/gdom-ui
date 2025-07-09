import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AudioPlayerProgressBar } from '@/lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerProgressBarPrimitive } from '@/lib/AudioPlayerProgressBar/AudioPlayerProgressBarPrimitive';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { trackData } from '@/data/trackData';
import { useAudioPlayerContextRefs } from '@/lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { AudioPlayerContextTimeProvider } from '@/lib/AudioPlayerContextTimeProvider/AudioPlayerContextTimeProvider';

function AudioElement() {
  const { audioRef } = useAudioPlayerContextRefs();
  return (
    <audio
      ref={audioRef}
      data-testid="audio"
    />
  );
}

describe('AudioPlayerProgressBar', () => {
  describe('without context', () => {
    test('should throw error when used without context', () => {
      vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
      expect(() => render(<AudioPlayerProgressBar />)).toThrow();
      vi.restoreAllMocks();
    });
  });

  describe('with context', () => {
    test('should allow custom className', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerProgressBar
            className="custom-class"
            data-testid="progress"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('progress')).toHaveClass('custom-class');
    });

    test('should forward additional props', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerProgressBar
            data-testid="progress"
            aria-label="Progress control"
          />
        </AudioPlayerContextProvider>,
      );

      expect(screen.getByTestId('progress')).toHaveAttribute('aria-label', 'Progress control');
    });

    test('should update audio currentTime on slider change', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioElement />
          <AudioPlayerProgressBar data-testid="progress" />
        </AudioPlayerContextProvider>,
      );

      const slider = screen.getByRole('slider');
      const audio = screen.getByTestId('audio') as HTMLAudioElement;

      fireEvent.change(slider, { target: { value: '50' } });
      expect(audio.currentTime).toBe(50);
    });

    test('should call custom onChange handler after internal handler', () => {
      const handleChange = vi.fn();

      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioElement />
          <AudioPlayerProgressBar
            data-testid="progress"
            onChange={handleChange}
          />
        </AudioPlayerContextProvider>,
      );

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '50' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });

    test('should update progress bar style on value change', () => {
      render(
        <AudioPlayerContextProvider tracks={trackData}>
          <AudioPlayerContextTimeProvider defaultDuration={100}>
            <AudioElement />
            <AudioPlayerProgressBar data-testid="progress" />
          </AudioPlayerContextTimeProvider>
        </AudioPlayerContextProvider>,
      );

      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '50' } });

      expect(slider.style.getPropertyValue('--range-progress')).toBe('50%');
    });
  });
});

describe('AudioPlayerProgressBarPrimitive', () => {
  test('should render with default aria-label', () => {
    render(<AudioPlayerProgressBarPrimitive data-testid="progress" />);

    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Audio progress');
  });

  test('should allow custom aria-label', () => {
    render(
      <AudioPlayerProgressBarPrimitive
        data-testid="progress"
        aria-label="Custom progress"
      />,
    );

    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Custom progress');
  });

  test('should call onChange when slider changes', () => {
    const handleChange = vi.fn();

    render(
      <AudioPlayerProgressBarPrimitive
        data-testid="progress"
        onChange={handleChange}
      />,
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '90' } });

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('should merge className with default styles', () => {
    render(
      <AudioPlayerProgressBarPrimitive
        className="custom-class"
        data-testid="progress"
      />,
    );

    expect(screen.getByTestId('progress')).toHaveClass('custom-class');
  });

  test('should forward additional props', () => {
    render(
      <AudioPlayerProgressBarPrimitive
        data-testid="progress"
        title="Progress bar"
      />,
    );

    expect(screen.getByTestId('progress')).toHaveAttribute('title', 'Progress bar');
  });

  test('should have correct default attributes', () => {
    render(<AudioPlayerProgressBarPrimitive data-testid="progress" />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveValue('0');
    expect(slider).toHaveAttribute('role', 'slider');
  });
});
