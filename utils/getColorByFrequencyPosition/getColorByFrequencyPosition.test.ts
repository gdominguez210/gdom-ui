import { describe, it, expect } from 'vitest';
import { getColorByFrequencyPosition } from './getColorByFrequencyPosition';

describe('getColorByFrequencyPosition should...', () => {
  const baseColor: [number, number, number] = [0.5, 0.2, 180];

  it('produce different colors based on position', () => {
    const color0 = getColorByFrequencyPosition(baseColor, 0);
    const color25 = getColorByFrequencyPosition(baseColor, 0.25);
    const color50 = getColorByFrequencyPosition(baseColor, 0.5);
    const color75 = getColorByFrequencyPosition(baseColor, 0.75);
    const color100 = getColorByFrequencyPosition(baseColor, 1);

    expect(color0).not.toBe(color25);
    expect(color25).not.toBe(color50);
    expect(color50).not.toBe(color75);
    expect(color75).not.toBe(color100);
  });

  it('return valid OKLCH color strings', () => {
    const color = getColorByFrequencyPosition(baseColor, 0.5);

    // Verify format matches "oklch(lightness chroma hue)"
    expect(color).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
  });

  it('maintain lightness and chroma values from the base color', () => {
    const testColor = [0.7, 0.3, 120] as [number, number, number];
    const color = getColorByFrequencyPosition(testColor, 0.5);

    expect(color).toContain('0.7');
    expect(color).toContain('0.3');
    expect(color).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
  });

  it('handle edge cases gracefully', () => {
    const colorNegative = getColorByFrequencyPosition(baseColor, -0.5);
    const colorOverOne = getColorByFrequencyPosition(baseColor, 1.5);

    // Out-of-range values should return valid colors
    // Below 0 should be same as position 0
    expect(colorNegative).toBe(getColorByFrequencyPosition(baseColor, 0));

    // Above 1 should be same as position 1
    expect(colorOverOne).toBe(getColorByFrequencyPosition(baseColor, 1));
  });
});
