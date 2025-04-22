import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { CanvasResponsive } from '@lib/CanvasResponsive/CanvasResponsive';
import { useCanvasResponsive } from '@lib/CanvasResponsive/useCanvasResponsive';

// Mock the dependencies
vi.mock('@lib/CanvasResponsive/useCanvasResponsive', () => ({
  useCanvasResponsive: vi.fn().mockImplementation(() => {
    const canvasRef = { current: document.createElement('canvas') };
    return canvasRef;
  }),
}));

describe('CanvasResponsive', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders canvas element with default classes', () => {
    render(<CanvasResponsive data-testid="responsive-canvas" />);

    const canvas = screen.getByTestId('responsive-canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
    expect(canvas).toHaveClass('w-full', 'max-w-full', 'object-contain');
  });

  test('applies additional className when provided', () => {
    render(
      <CanvasResponsive
        data-testid="responsive-canvas"
        className="test-class bg-red-500"
      />,
    );

    const canvas = screen.getByTestId('responsive-canvas');
    expect(canvas).toHaveClass(
      'w-full',
      'max-w-full',
      'object-contain',
      'test-class',
      'bg-red-500',
    );
  });

  test('forwards additional props to canvas element', () => {
    render(
      <CanvasResponsive
        data-testid="responsive-canvas"
        width={300}
        height={200}
        style={{ border: '1px solid black' }}
        aria-label="A responsive canvas"
      />,
    );

    const canvas = screen.getByTestId('responsive-canvas');
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '200');
    expect(canvas).toHaveStyle({ border: '1px solid black' });
    expect(canvas).toHaveAttribute('aria-label', 'A responsive canvas');
  });

  test('forwards ref to canvas element', () => {
    const ref = { current: null };

    render(
      <CanvasResponsive
        data-testid="responsive-canvas"
        ref={ref}
      />,
    );

    const canvas = screen.getByTestId('responsive-canvas');
    expect(ref.current).toBe(canvas);
  });

  test('uses useCanvasResponsive hook for canvas responsiveness', () => {
    render(<CanvasResponsive data-testid="responsive-canvas" />);

    // Check that the hook was called at least once
    expect(useCanvasResponsive).toHaveBeenCalled();
  });

  test('accepts and passes frameRate prop', () => {
    render(
      <CanvasResponsive
        data-testid="responsive-canvas"
        frameRate={30}
      />,
    );

    expect(useCanvasResponsive).toHaveBeenCalledWith(expect.objectContaining({ frameRate: 30 }));
  });

  test('accepts and passes onResize prop', () => {
    const onResize = vi.fn();

    render(
      <CanvasResponsive
        data-testid="responsive-canvas"
        onResize={onResize}
      />,
    );

    expect(useCanvasResponsive).toHaveBeenCalledWith(expect.objectContaining({ onResize }));
  });
});
