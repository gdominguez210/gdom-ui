import { describe, it, expect } from 'vitest';
import { getColorBySpectrum } from './getColorBySpectrum';

describe('getColorBySpectrum', () => {
  const baseColor: [number, number, number] = [0.5, 0.2, 180];

  it('should produce different colors based on position', () => {
    const color0 = getColorBySpectrum(baseColor, 0);
    const color25 = getColorBySpectrum(baseColor, 0.25);
    const color50 = getColorBySpectrum(baseColor, 0.5);
    const color75 = getColorBySpectrum(baseColor, 0.75);
    const color100 = getColorBySpectrum(baseColor, 1);

    expect(color0).not.toBe(color25);
    expect(color25).not.toBe(color50);
    expect(color50).not.toBe(color75);
    expect(color75).not.toBe(color100);
  });

  it('should return valid OKLCH color strings', () => {
    const color = getColorBySpectrum(baseColor, 0.5);

    expect(color).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
  });

  it('should maintain lightness and chroma values from the base color', () => {
    const testColor = [0.7, 0.3, 120] as [number, number, number];
    const color = getColorBySpectrum(testColor, 0.5);

    expect(color).toContain('0.7');
    expect(color).toContain('0.3');
    expect(color).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
  });

  it('should handle edge cases gracefully', () => {
    const colorNegative = getColorBySpectrum(baseColor, -0.5);
    const colorOverOne = getColorBySpectrum(baseColor, 1.5);

    // Out-of-range values should return valid colors
    // Below 0 should be same as position 0
    expect(colorNegative).toBe(getColorBySpectrum(baseColor, 0));

    // Above 1 should be same as position 1
    expect(colorOverOne).toBe(getColorBySpectrum(baseColor, 1));
  });
});
