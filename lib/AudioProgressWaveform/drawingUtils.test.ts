import { describe, it, expect } from 'vitest';
import {
  calculateBarCoverage,
  shouldApplyHoverEffect,
  getNormalizedHoverPosition,
} from './drawingUtils';
import type { MousePosition } from '@lib/useMousePositionRef/useMousePositionRef';
import type { ElementDimensions } from '@lib/useElementDimensions/useElementDimensions';

describe('AudioProgressWaveform drawingUtils', () => {
  describe('calculateBarCoverage should...', () => {
    it('return 1 when bar is fully behind progress', () => {
      const barInfo = { position: 0.3, width: 0.1 };
      const progress = 0.4;

      const result = calculateBarCoverage(barInfo, progress);

      expect(result).toBe(1);
    });

    it('return 0 when bar is fully ahead of progress', () => {
      const barInfo = { position: 0.6, width: 0.1 };
      const progress = 0.5;

      const result = calculateBarCoverage(barInfo, progress);

      expect(result).toBe(0);
    });

    it('calculate partial coverage correctly', () => {
      const barInfo = { position: 0.5, width: 0.1 };
      const progress = 0.48;

      const result = calculateBarCoverage(barInfo, progress);

      // Bar range is 0.45-0.55, progress is at 0.48
      // Coverage should be (0.48 - 0.45) / 0.1 = 0.3
      expect(result).toBe(0.3);
    });

    it('handle edge case when progress is exactly at bar start', () => {
      const barInfo = { position: 0.5, width: 0.1 };
      const progress = 0.45; // Start of bar

      const result = calculateBarCoverage(barInfo, progress);

      expect(result).toBe(0);
    });

    it('handle edge case when progress is exactly at bar end', () => {
      const barInfo = { position: 0.5, width: 0.1 };
      const progress = 0.55; // End of bar

      const result = calculateBarCoverage(barInfo, progress);

      expect(result).toBe(1);
    });
  });

  describe('shouldApplyHoverEffect should...', () => {
    it('return true when bar is between progress and hover (hover > progress)', () => {
      const barPosition = 0.6;
      const currentProgress = 0.5;
      const hoverPosition = 0.7;

      const result = shouldApplyHoverEffect(barPosition, currentProgress, hoverPosition);

      expect(result).toBe(true);
    });

    it('return true when bar is between hover and progress (hover < progress)', () => {
      const barPosition = 0.6;
      const currentProgress = 0.7;
      const hoverPosition = 0.5;

      const result = shouldApplyHoverEffect(barPosition, currentProgress, hoverPosition);

      expect(result).toBe(true);
    });

    it('return false when bar is outside hover-progress range (ahead of both)', () => {
      const barPosition = 0.8;
      const currentProgress = 0.5;
      const hoverPosition = 0.7;

      const result = shouldApplyHoverEffect(barPosition, currentProgress, hoverPosition);

      expect(result).toBe(false);
    });

    it('return false when bar is outside hover-progress range (behind both)', () => {
      const barPosition = 0.3;
      const currentProgress = 0.5;
      const hoverPosition = 0.7;

      const result = shouldApplyHoverEffect(barPosition, currentProgress, hoverPosition);

      expect(result).toBe(false);
    });

    it('return false when hover is at the same position as progress', () => {
      const barPosition = 0.6;
      const currentProgress = 0.5;
      const hoverPosition = 0.5;

      const result = shouldApplyHoverEffect(barPosition, currentProgress, hoverPosition);

      expect(result).toBe(false);
    });
  });

  describe('getNormalizedHoverPosition should...', () => {
    it('calculate normalized position from mouse coordinates and element width', () => {
      const mousePosition: MousePosition = {
        clientX: 50,
        clientY: 20,
        offsetX: 50,
        offsetY: 20,
      };
      const dimensions: ElementDimensions = {
        width: 200,
        height: 100,
        top: 0,
        right: 200,
        bottom: 100,
        left: 0,
        x: 0,
        y: 0,
      };

      const result = getNormalizedHoverPosition(mousePosition, dimensions);

      expect(result).toBe(0.25); // 50/200 = 0.25
    });

    it('return undefined when mouse position is undefined', () => {
      const mousePosition = undefined;
      const dimensions: ElementDimensions = {
        width: 200,
        height: 100,
        top: 0,
        right: 200,
        bottom: 100,
        left: 0,
        x: 0,
        y: 0,
      };

      const result = getNormalizedHoverPosition(mousePosition, dimensions);

      expect(result).toBeUndefined();
    });

    it('return undefined when dimensions are undefined', () => {
      const mousePosition: MousePosition = {
        clientX: 50,
        clientY: 20,
        offsetX: 50,
        offsetY: 20,
      };
      const dimensions = undefined;

      const result = getNormalizedHoverPosition(mousePosition, dimensions);

      expect(result).toBeUndefined();
    });

    it('return undefined when offsetX is not a number', () => {
      const mousePosition: MousePosition = {
        clientX: 50,
        clientY: 20,
        offsetX: null,
        offsetY: 20,
      };
      const dimensions: ElementDimensions = {
        width: 200,
        height: 100,
        top: 0,
        right: 200,
        bottom: 100,
        left: 0,
        x: 0,
        y: 0,
      };

      const result = getNormalizedHoverPosition(mousePosition, dimensions);

      expect(result).toBeUndefined();
    });

    it('return undefined when width is not a positive number', () => {
      const mousePosition: MousePosition = {
        clientX: 50,
        clientY: 20,
        offsetX: 50,
        offsetY: 20,
      };
      const dimensions: ElementDimensions = {
        width: 0,
        height: 100,
        top: 0,
        right: 0,
        bottom: 100,
        left: 0,
        x: 0,
        y: 0,
      };

      const result = getNormalizedHoverPosition(mousePosition, dimensions);

      expect(result).toBeUndefined();
    });
  });
});
