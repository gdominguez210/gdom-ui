import { describe, it, expect } from 'vitest';
import { getBarColor, FREQUENCY_BARS_COLOR_MODES, type DynamicColorMode } from './drawingUtils';
import type { OKLCHColor } from '@lib/types/colors';

describe('AudioVisualizerFrequencyBars drawingUtils', () => {
  describe('getBarColor should...', () => {
    it('use the correct color mode function based on the mode parameter', () => {
      const baseColor: OKLCHColor = [0.7, 0.3, 200];
      const positionRatio = 0.5;
      const intensityRatio = 0.8;

      const frequencyResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.FREQUENCY as DynamicColorMode,
        positionRatio,
        intensityRatio,
      );

      const intensityResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.INTENSITY as DynamicColorMode,
        positionRatio,
        intensityRatio,
      );

      const spectrumResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.SPECTRUM as DynamicColorMode,
        positionRatio,
        intensityRatio,
      );

      const dynamicResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.DYNAMIC as DynamicColorMode,
        positionRatio,
        intensityRatio,
      );

      expect(frequencyResult).toMatch(/oklch\(/);
      expect(intensityResult).toMatch(/oklch\(/);
      expect(spectrumResult).toMatch(/oklch\(/);
      expect(dynamicResult).toMatch(/oklch\(/);

      const results = [frequencyResult, intensityResult, spectrumResult, dynamicResult];
      const uniqueResults = new Set(results);

      // At least some of the results should be different from each other
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it('pass position ratio to frequency-based color modes', () => {
      const baseColor: OKLCHColor = [0.7, 0.3, 200];

      // Test with different position ratios
      const lowPositionResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.FREQUENCY as DynamicColorMode,
        0.1,
        0.5,
      );

      const highPositionResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.FREQUENCY as DynamicColorMode,
        0.9,
        0.5,
      );

      // Position should affect the output for frequency-based modes
      expect(lowPositionResult).not.toBe(highPositionResult);
    });

    it('pass intensity ratio to intensity-based color modes', () => {
      const baseColor: OKLCHColor = [0.7, 0.3, 200];

      const lowIntensityResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.INTENSITY as DynamicColorMode,
        0.5,
        0.1,
      );

      const highIntensityResult = getBarColor(
        baseColor,
        FREQUENCY_BARS_COLOR_MODES.INTENSITY as DynamicColorMode,
        0.5,
        0.9,
      );

      // Intensity should affect the output for intensity-based modes
      expect(lowIntensityResult).not.toBe(highIntensityResult);
    });

    it('use the base color to derive the output colors', () => {
      const redColor: OKLCHColor = [0.6, 0.3, 30]; // Reddish
      const blueColor: OKLCHColor = [0.6, 0.3, 260]; // Bluish

      const redResult = getBarColor(
        redColor,
        FREQUENCY_BARS_COLOR_MODES.INTENSITY as DynamicColorMode,
        0.5,
        0.5,
      );

      const blueResult = getBarColor(
        blueColor,
        FREQUENCY_BARS_COLOR_MODES.INTENSITY as DynamicColorMode,
        0.5,
        0.5,
      );

      expect(redResult).not.toBe(blueResult);
    });
  });
});
