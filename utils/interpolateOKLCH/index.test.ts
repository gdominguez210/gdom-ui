import { describe, it, expect } from 'vitest';
import { interpolateOKLCH } from '@/utils/interpolateOKLCH';
import type { OKLCHColor } from '@/types/colors';

describe('interpolateOKLCH', () => {
  it('should return colorA when progress is 0', () => {
    const colorA: OKLCHColor = [0.5, 0.2, 30];
    const colorB: OKLCHColor = [0.8, 0.4, 180];

    const result = interpolateOKLCH(colorA, colorB, 0);

    expect(result[0]).toBeCloseTo(colorA[0]);
    expect(result[1]).toBeCloseTo(colorA[1]);
    expect(result[2]).toBeCloseTo(colorA[2]);
  });

  it('should return colorB when progress is 1', () => {
    const colorA: OKLCHColor = [0.5, 0.2, 30];
    const colorB: OKLCHColor = [0.8, 0.4, 180];

    const result = interpolateOKLCH(colorA, colorB, 1);

    expect(result[0]).toBeCloseTo(colorB[0]);
    expect(result[1]).toBeCloseTo(colorB[1]);
    expect(result[2]).toBeCloseTo(colorB[2]);
  });

  it('should interpolate lightness and chroma linearly', () => {
    const colorA: OKLCHColor = [0.2, 0.1, 30];
    const colorB: OKLCHColor = [0.8, 0.5, 30];
    const progress = 0.5;

    const result = interpolateOKLCH(colorA, colorB, progress);

    // Halfway between 0.2 and 0.8 is 0.5 for lightness
    expect(result[0]).toBeCloseTo(0.5);

    // Halfway between 0.1 and 0.5 is 0.3 for chroma
    expect(result[1]).toBeCloseTo(0.3);

    // Hue remains the same when both colors have the same hue
    expect(result[2]).toBeCloseTo(30);
  });

  it('should interpolate between different hues (small angle difference)', () => {
    const colorA: OKLCHColor = [0.5, 0.3, 30];
    const colorB: OKLCHColor = [0.5, 0.3, 90];
    const progress = 0.5;

    const result = interpolateOKLCH(colorA, colorB, progress);

    // Lightness and chroma should remain the same
    expect(result[0]).toBeCloseTo(0.5);
    expect(result[1]).toBeCloseTo(0.3);

    // Hue should be halfway between 30 and 90
    expect(result[2]).toBeCloseTo(60);
  });

  it('should handle hue interpolation correctly when crossing 0/360 boundary (forward)', () => {
    const colorA: OKLCHColor = [0.5, 0.3, 330];
    const colorB: OKLCHColor = [0.5, 0.3, 30];
    const progress = 0.5;

    const result = interpolateOKLCH(colorA, colorB, progress);

    // Hue should go from 330 to 30 via the shortest path (through 0/360)
    // The shortest angle is 60 degrees, so halfway should be 330 + 30 = 360(0) or 0
    expect(result[2]).toBeCloseTo(0);
  });

  it('should handle hue interpolation correctly when crossing 0/360 boundary (backward)', () => {
    const colorA: OKLCHColor = [0.5, 0.3, 30];
    const colorB: OKLCHColor = [0.5, 0.3, 330];
    const progress = 0.5;

    const result = interpolateOKLCH(colorA, colorB, progress);

    // Hue should go from 30 to 330 via the shortest path (through 0/360)
    // The shortest angle is 60 degrees, so halfway should be 0
    expect(result[2]).toBeCloseTo(0);
  });

  it('should handle large hue differences correctly', () => {
    const colorA: OKLCHColor = [0.5, 0.3, 30];
    const colorB: OKLCHColor = [0.5, 0.3, 210];
    const progress = 0.5;

    const result = interpolateOKLCH(colorA, colorB, progress);

    // The angular distance is 180 degrees, so halfway should be 120
    expect(result[2]).toBeCloseTo(120);
  });

  it('should clamp progress values below 0 to 0', () => {
    const colorA: OKLCHColor = [0.2, 0.1, 30];
    const colorB: OKLCHColor = [0.8, 0.5, 90];

    const result = interpolateOKLCH(colorA, colorB, -0.5);

    // Should be the same as progress = 0 (colorA)
    expect(result[0]).toBeCloseTo(colorA[0]);
    expect(result[1]).toBeCloseTo(colorA[1]);
    expect(result[2]).toBeCloseTo(colorA[2]);
  });

  it('should clamp progress values above 1 to 1', () => {
    const colorA: OKLCHColor = [0.2, 0.1, 30];
    const colorB: OKLCHColor = [0.8, 0.5, 90];

    const result = interpolateOKLCH(colorA, colorB, 1.5);

    // Should be the same as progress = 1 (colorB)
    expect(result[0]).toBeCloseTo(colorB[0]);
    expect(result[1]).toBeCloseTo(colorB[1]);
    expect(result[2]).toBeCloseTo(colorB[2]);
  });

  it('should handle antipodal hue values (180 degrees apart)', () => {
    const colorA: OKLCHColor = [0.5, 0.3, 0];
    const colorB: OKLCHColor = [0.5, 0.3, 180];

    const result = interpolateOKLCH(colorA, colorB, 0.5);

    // For a 180-degree difference, it can go either way,
    // but it should end up at 90 or 270 degrees
    expect(result[2]).toBeCloseTo(90);
  });

  it('should maintain the same hue when only lightness and chroma change', () => {
    const colorA: OKLCHColor = [0.2, 0.1, 45];
    const colorB: OKLCHColor = [0.8, 0.5, 45];

    const result = interpolateOKLCH(colorA, colorB, 0.75);

    // Hue should remain unchanged
    expect(result[2]).toBeCloseTo(45);

    // Lightness and chroma should be interpolated
    expect(result[0]).toBeCloseTo(0.65); // 0.2 + 0.75 * (0.8 - 0.2)
    expect(result[1]).toBeCloseTo(0.4); // 0.1 + 0.75 * (0.5 - 0.1)
  });

  it('should handle numerical precision issues with hue values', () => {
    // Test with values that might cause floating-point issues
    const colorA: OKLCHColor = [0.5, 0.3, 359.9];
    const colorB: OKLCHColor = [0.5, 0.3, 0.1];

    const result = interpolateOKLCH(colorA, colorB, 0.5);

    // Should go through 0 degrees, ending up at 0 degrees
    // since 359.9 and 0.1 are just 0.2 degrees apart
    expect(result[2]).toBeCloseTo(0);
  });
});
