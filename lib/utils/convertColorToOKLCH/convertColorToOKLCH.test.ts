import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import { convertColorToOKLCH } from './convertColorToOKLCH';

// Mock the DOM methods that convertColorToOKLCH relies on
const mockDocument = {
  createElement: vi.fn(() => ({
    style: { color: '' },
  })),
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
  },
};

const mockGetComputedStyle = vi.fn();

let originalDocument: typeof document;
let originalGetComputedStyle: typeof getComputedStyle;

describe('convertColorToOKLCH should...', () => {
  beforeAll(() => {
    originalDocument = { ...document };
    originalGetComputedStyle = getComputedStyle;

    vi.stubGlobal('document', mockDocument);
    vi.stubGlobal('getComputedStyle', mockGetComputedStyle);
  });

  afterAll(() => {
    vi.stubGlobal('document', originalDocument);
    vi.stubGlobal('getComputedStyle', originalGetComputedStyle);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('convert black to OKLCH values', () => {
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(0, 0, 0)',
    });

    const result = convertColorToOKLCH('#000000');

    expect(result[0]).toBeCloseTo(0, 2); // Lightness
    expect(result[1]).toBeCloseTo(0, 2); // Chroma
  });

  it('convert white to OKLCH values', () => {
    // Setup mock to return white RGB values
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(255, 255, 255)',
    });

    const result = convertColorToOKLCH('#FFFFFF');

    // White in OKLCH should have 1 lightness, 0 chroma, and hue doesn't matter
    expect(result[0]).toBeCloseTo(1, 2); // Lightness
    expect(result[1]).toBeCloseTo(0, 2); // Chroma
  });

  it('convert primary colors to OKLCH values', () => {
    // Test red
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(255, 0, 0)',
    });
    const redResult = convertColorToOKLCH('red');

    expect(redResult[0]).toBeGreaterThan(0); // Lightness
    expect(redResult[1]).toBeGreaterThan(0); // Chroma
    expect(redResult[2]).toBeCloseTo(29, 0); // Hue around 29 degrees

    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(0, 255, 0)',
    });
    const greenResult = convertColorToOKLCH('green');

    expect(greenResult[0]).toBeGreaterThan(0); // Lightness
    expect(greenResult[1]).toBeGreaterThan(0); // Chroma
    expect(greenResult[2]).toBeCloseTo(142.5, 0); // Hue around 142.5 degrees

    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(0, 0, 255)',
    });
    const blueResult = convertColorToOKLCH('blue');

    expect(blueResult[0]).toBeGreaterThan(0); // Lightness
    expect(blueResult[1]).toBeGreaterThan(0); // Chroma
    expect(blueResult[2]).toBeCloseTo(264, 0); // Hue around 264 degrees
  });

  it('handle RGB color notation', () => {
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(100, 150, 200)',
    });

    const result = convertColorToOKLCH('rgb(100, 150, 200)');

    expect(mockDocument.createElement).toHaveBeenCalledWith('div');
    expect(mockDocument.body.appendChild).toHaveBeenCalled();
    expect(mockGetComputedStyle).toHaveBeenCalled();
    expect(mockDocument.body.removeChild).toHaveBeenCalled();

    expect(result[0]).toBeGreaterThan(0); // Lightness
    expect(result[1]).toBeGreaterThan(0); // Chroma
    expect(result[2]).toBeGreaterThanOrEqual(0); // Hue
    expect(result[2]).toBeLessThanOrEqual(360); // Hue
  });

  it('handle HSL color notation', () => {
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(100, 150, 200)', // Browser converts HSL to RGB
    });

    const result = convertColorToOKLCH('hsl(210, 50%, 60%)');

    // Verify we're using browser's color parsing
    expect(mockDocument.createElement).toHaveBeenCalledWith('div');

    expect(result[0]).toBeGreaterThan(0); // Lightness
    expect(result[1]).toBeGreaterThan(0); // Chroma
    expect(result[2]).toBeGreaterThanOrEqual(0); // Hue
    expect(result[2]).toBeLessThanOrEqual(360); // Hue
  });

  it('handle CSS color names', () => {
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(128, 0, 128)', // Purple
    });

    const result = convertColorToOKLCH('purple');

    expect(result[0]).toBeGreaterThan(0); // Lightness
    expect(result[1]).toBeGreaterThan(0); // Chroma
    expect(result[2]).toBeCloseTo(328, 0); // Hue around 328 degrees (purple)
  });

  it('gracefully handle parsing failures', () => {
    // Simulate a parsing failure by returning a non-matching color format
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'invalid-color-format',
    });

    const result = convertColorToOKLCH('not-a-real-color');

    expect(result[0]).toBeCloseTo(0, 2); // Lightness
    expect(result[1]).toBeCloseTo(0, 2); // Chroma
  });

  it('round values to two decimal places by default', () => {
    mockGetComputedStyle.mockReturnValueOnce({
      color: 'rgb(123, 45, 67)',
    });

    const result = convertColorToOKLCH('rgb(123, 45, 67)');

    // Check that the values have at most 2 decimal places
    result.forEach((value) => {
      const decimalPlaces = value.toString().split('.')[1]?.length || 0;
      expect(decimalPlaces).toBeLessThanOrEqual(2);
    });
  });

  it('directly parse OKLCH values without full conversion', () => {
    const result = convertColorToOKLCH('oklch(0.6 0.3 30)');

    expect(result).toHaveLength(3);
    expect(result[0]).toBeCloseTo(0.6);
    expect(result[1]).toBeCloseTo(0.3);
    expect(result[2]).toBeCloseTo(30);
  });

  it('handle OKLCH values with alpha', () => {
    const result = convertColorToOKLCH('oklch(0.6 0.3 30 / 0.5)');

    expect(result).toHaveLength(3);
    expect(result[0]).toBeCloseTo(0.6);
    expect(result[1]).toBeCloseTo(0.3);
    expect(result[2]).toBeCloseTo(30);
  });
});
