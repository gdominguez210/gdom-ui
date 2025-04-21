import { describe, it, expect } from 'vitest';
import { getColorByAudioIntensity } from './getColorByAudioIntensity';

describe('getColorByAudioIntensity should...', () => {
  const baseColor: [number, number, number] = [0.5, 0.2, 180];

  it('produce different colors based on intensity', () => {
    const color0 = getColorByAudioIntensity(baseColor, 0);
    const color25 = getColorByAudioIntensity(baseColor, 0.25);
    const color50 = getColorByAudioIntensity(baseColor, 0.5);
    const color75 = getColorByAudioIntensity(baseColor, 0.75);
    const color100 = getColorByAudioIntensity(baseColor, 1);

    expect(color0).not.toBe(color25);
    expect(color25).not.toBe(color50);
    expect(color50).not.toBe(color75);
    expect(color75).not.toBe(color100);
  });

  it('return valid OKLCH color strings', () => {
    const color = getColorByAudioIntensity(baseColor, 0.5);

    // Verify format matches "oklch(lightness chroma hue)"
    expect(color).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
  });

  it('maintain chroma and hue values from the base color', () => {
    const testColor = [0.5, 0.3, 120] as [number, number, number];
    const color = getColorByAudioIntensity(testColor, 0.5);

    expect(color).toContain('0.3');
    expect(color).toContain('120');

    expect(color).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
  });

  it('handle edge cases gracefully', () => {
    const colorNegative = getColorByAudioIntensity(baseColor, -0.5);
    const colorOverOne = getColorByAudioIntensity(baseColor, 1.5);

    // Out-of-range values should return valid colors
    // Below 0 should be same as intensity 0
    expect(colorNegative).toBe(getColorByAudioIntensity(baseColor, 0));

    // Above 1 should be same as intensity 1
    expect(colorOverOne).toBe(getColorByAudioIntensity(baseColor, 1));
  });
});
