import { describe, it, expect, vi } from 'vitest';
import {
  drawStaticWaveform,
  drawSegmentedWaveform,
  applySegmentColor,
  WAVEFORM_COLOR_MODES,
  type DynamicColorMode,
} from './drawingUtils';
import type { OKLCHColor } from 'types/colors';

describe('AudioVisualizerWaveform drawingUtils', () => {
  const createCanvasMock = () => {
    return {
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      strokeStyle: null as unknown as string,
    };
  };

  describe('drawStaticWaveform should...', () => {
    it('create a path with the correct number of data points', () => {
      const ctx = createCanvasMock();
      const dataArray = new Uint8Array([128, 150, 180, 200, 170]);
      const displayWidth = 500;
      const displayHeight = 200;
      const lineColor = 'oklch(0.7 0.3 200)';

      drawStaticWaveform(
        ctx as unknown as CanvasRenderingContext2D,
        dataArray,
        displayWidth,
        displayHeight,
        lineColor,
      );

      expect(ctx.beginPath).toHaveBeenCalledTimes(1);

      expect(ctx.moveTo).toHaveBeenCalledTimes(1);
      expect(ctx.lineTo).toHaveBeenCalledTimes(4);

      expect(ctx.stroke).toHaveBeenCalledTimes(1);
    });

    it('set the correct stroke style', () => {
      const ctx = createCanvasMock();
      const dataArray = new Uint8Array([128, 150, 180]);
      const displayWidth = 300;
      const displayHeight = 150;
      const lineColor = 'oklch(0.7 0.3 200)';

      drawStaticWaveform(
        ctx as unknown as CanvasRenderingContext2D,
        dataArray,
        displayWidth,
        displayHeight,
        lineColor,
      );

      expect(ctx.strokeStyle).toBe(lineColor);
    });
  });

  describe('applySegmentColor should...', () => {
    it('set the correct stroke style based on color mode', () => {
      const ctx = createCanvasMock();
      const segmentStartIndex = 5;
      const dataArray = new Uint8Array(10).fill(128);
      dataArray[segmentStartIndex] = 200; // Higher value for testing
      const baseColor: OKLCHColor = [0.7, 0.3, 200];

      const amplitudeMode = WAVEFORM_COLOR_MODES.AMPLITUDE as DynamicColorMode;
      applySegmentColor(
        ctx as unknown as CanvasRenderingContext2D,
        segmentStartIndex,
        dataArray,
        baseColor,
        amplitudeMode,
      );
      const amplitudeColor = ctx.strokeStyle;

      const frequencyMode = WAVEFORM_COLOR_MODES.FREQUENCY as DynamicColorMode;
      applySegmentColor(
        ctx as unknown as CanvasRenderingContext2D,
        segmentStartIndex,
        dataArray,
        baseColor,
        frequencyMode,
      );
      const frequencyColor = ctx.strokeStyle;

      const spectrumMode = WAVEFORM_COLOR_MODES.SPECTRUM as DynamicColorMode;
      applySegmentColor(
        ctx as unknown as CanvasRenderingContext2D,
        segmentStartIndex,
        dataArray,
        baseColor,
        spectrumMode,
      );
      const spectrumColor = ctx.strokeStyle;

      const dynamicMode = WAVEFORM_COLOR_MODES.DYNAMIC as DynamicColorMode;
      applySegmentColor(
        ctx as unknown as CanvasRenderingContext2D,
        segmentStartIndex,
        dataArray,
        baseColor,
        dynamicMode,
      );
      const dynamicColor = ctx.strokeStyle;

      expect(amplitudeColor).toMatch(/oklch\(/);
      expect(frequencyColor).toMatch(/oklch\(/);
      expect(spectrumColor).toMatch(/oklch\(/);
      expect(dynamicColor).toMatch(/oklch\(/);

      const uniqueColors = new Set([amplitudeColor, frequencyColor, spectrumColor, dynamicColor]);
      expect(uniqueColors.size).toBeGreaterThan(1);
    });
  });

  describe('drawSegmentedWaveform should...', () => {
    it('divide the waveform into the correct number of segments', () => {
      const ctx = createCanvasMock();
      const dataArray = new Uint8Array(100).fill(128);
      const displayWidth = 1000;
      const displayHeight = 400;
      const baseColor: OKLCHColor = [0.7, 0.3, 200];
      const colorMode = WAVEFORM_COLOR_MODES.SPECTRUM as DynamicColorMode;
      const segmentCount = 4;

      drawSegmentedWaveform(
        ctx as unknown as CanvasRenderingContext2D,
        dataArray,
        displayWidth,
        displayHeight,
        baseColor,
        colorMode,
        segmentCount,
      );

      expect(ctx.beginPath).toHaveBeenCalledTimes(segmentCount);
      expect(ctx.stroke).toHaveBeenCalledTimes(segmentCount);
    });

    it('handle segmentCount larger than data length', () => {
      const ctx = createCanvasMock();
      const dataArray = new Uint8Array(5).fill(128);
      const displayWidth = 500;
      const displayHeight = 200;
      const baseColor: OKLCHColor = [0.7, 0.3, 200];
      const colorMode = WAVEFORM_COLOR_MODES.SPECTRUM as DynamicColorMode;
      const segmentCount = 10; // More segments than data points

      expect(() => {
        drawSegmentedWaveform(
          ctx as unknown as CanvasRenderingContext2D,
          dataArray,
          displayWidth,
          displayHeight,
          baseColor,
          colorMode,
          segmentCount,
        );
      }).not.toThrow();

      expect(ctx.beginPath).toHaveBeenCalledTimes(dataArray.length);
    });
  });
});
