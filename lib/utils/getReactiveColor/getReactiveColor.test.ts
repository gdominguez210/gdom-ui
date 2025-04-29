import { describe, it, expect } from 'vitest';
import { getReactiveColor, type ReactivePropertyConfig } from './getReactiveColor';
import { OKLCHProperty } from '@lib/types/colors';

describe('getReactiveColor should...', () => {
  const baseColor: [number, number, number] = [0.5, 0.2, 180];

  it('return the base color when no property configs are provided', () => {
    const result = getReactiveColor(baseColor, 0.5, []);
    expect(result).toBe('oklch(0.5 0.2 180)');
  });

  it('modify lightness based on intensity', () => {
    const config: ReactivePropertyConfig[] = [
      { property: OKLCHProperty.LIGHTNESS, min: 0.3, max: 0.7 },
    ];

    // Test with 0 intensity (should use min value)
    expect(getReactiveColor(baseColor, 0, config)).toBe('oklch(0.3 0.2 180)');

    // Test with 1 intensity (should use max value)
    expect(getReactiveColor(baseColor, 1, config)).toBe('oklch(0.7 0.2 180)');

    // Test with 0.5 intensity (should be halfway between min and max)
    expect(getReactiveColor(baseColor, 0.5, config)).toBe('oklch(0.5 0.2 180)');
  });

  it('modify chroma based on intensity', () => {
    const config: ReactivePropertyConfig[] = [
      { property: OKLCHProperty.CHROMA, min: 0.1, max: 0.3 },
    ];

    expect(getReactiveColor(baseColor, 0, config)).toBe('oklch(0.5 0.1 180)');
    expect(getReactiveColor(baseColor, 1, config)).toBe('oklch(0.5 0.3 180)');
    expect(getReactiveColor(baseColor, 0.5, config)).toBe('oklch(0.5 0.2 180)');
  });

  it('modify hue based on intensity', () => {
    const config: ReactivePropertyConfig[] = [{ property: OKLCHProperty.HUE, min: 90, max: 270 }];

    expect(getReactiveColor(baseColor, 0, config)).toBe('oklch(0.5 0.2 90)');
    expect(getReactiveColor(baseColor, 1, config)).toBe('oklch(0.5 0.2 270)');
    expect(getReactiveColor(baseColor, 0.5, config)).toBe('oklch(0.5 0.2 180)');
  });

  it('modify multiple properties simultaneously', () => {
    const config: ReactivePropertyConfig[] = [
      { property: OKLCHProperty.LIGHTNESS, min: 0.4, max: 0.6 },
      { property: OKLCHProperty.CHROMA, min: 0.1, max: 0.3 },
      { property: OKLCHProperty.HUE, min: 120, max: 240 },
    ];

    // Test with 0 intensity (should use all min values)
    expect(getReactiveColor(baseColor, 0, config)).toBe('oklch(0.4 0.1 120)');

    // Test with 1 intensity (should use all max values)
    expect(getReactiveColor(baseColor, 1, config)).toBe('oklch(0.6 0.3 240)');

    // Test with 0.5 intensity (should be halfway between min and max for each property)
    expect(getReactiveColor(baseColor, 0.5, config)).toBe('oklch(0.5 0.2 180)');
  });

  it('clamp intensity values to the range 0-1', () => {
    const config: ReactivePropertyConfig[] = [
      { property: OKLCHProperty.LIGHTNESS, min: 0.3, max: 0.7 },
    ];

    // Test with negative intensity (should be clamped to 0)
    expect(getReactiveColor(baseColor, -0.5, config)).toBe('oklch(0.3 0.2 180)');

    // Test with intensity > 1 (should be clamped to 1)
    expect(getReactiveColor(baseColor, 1.5, config)).toBe('oklch(0.7 0.2 180)');
  });

  it('apply easing functions to intensity', () => {
    // Example easing function: quadratic ease-in (t²)
    const quadraticEaseIn = (t: number) => t * t;

    const config: ReactivePropertyConfig[] = [
      {
        property: OKLCHProperty.LIGHTNESS,
        min: 0.1,
        max: 0.9,
        easing: quadraticEaseIn,
      },
    ];

    // With intensity 0.5 and quadratic easing:
    // eased intensity = 0.5² = 0.25
    // Expected value = 0.1 + (0.9 - 0.1) * 0.25 = 0.1 + 0.8 * 0.25 = 0.1 + 0.2 = 0.3
    expect(getReactiveColor(baseColor, 0.5, config)).toBe('oklch(0.3 0.2 180)');

    // With intensity 0.7 and quadratic easing:
    // eased intensity = 0.7² = 0.49
    // Expected value = 0.1 + (0.9 - 0.1) * 0.49 = 0.1 + 0.8 * 0.49 = 0.1 + 0.392 = 0.492
    // Rounded to 0.49 for the test
    expect(getReactiveColor(baseColor, 0.7, config)).toBe('oklch(0.492 0.2 180)');
  });
});
