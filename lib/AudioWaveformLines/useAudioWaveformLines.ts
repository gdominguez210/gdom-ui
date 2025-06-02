import { useCallback, useEffect } from 'react';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
import type { BaseAudioWaveformOptions, WaveformColorResult } from '@/types/waveform';
import {
  calculateDistanceBetweenPoints,
  calculateAngleBetweenPoints,
  normalizeDistance,
  calculateBezierControlPoints,
} from './drawingUtils';

export type WaveformLineInfo = {
  position: number;
  value: number;
  index: number;
  distanceToNextPoint: number;
  angle: number;
};

export type UseAudioWaveformLinesOptions = BaseAudioWaveformOptions & {
  getColor?: (line: WaveformLineInfo) => WaveformColorResult;
  lineWidth?: number;
  smoothingFactor: number;
  drawOnCanvasReady?: boolean;
};

export function useAudioWaveformLines(props: UseAudioWaveformLinesOptions) {
  const {
    waveformData,
    color = '#9f9fa9',
    getColor,
    lineWidth = 1,
    smoothingFactor = 0,
    heightScale = 1,
    drawOnCanvasReady = true,
  } = props;

  const [setCanvasRef, isReady, canvasRef] = useRefReady<HTMLCanvasElement | null>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !waveformData.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;

    const sliceWidth = displayWidth / waveformData.length;
    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;

    ctx.beginPath();

    waveformData.forEach((value, index) => {
      const x = index * sliceWidth;
      const y = centerY - value * maxHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = (index - 1) * sliceWidth;
        const prevY = centerY - (waveformData[index - 1] ?? 0) * maxHeight;

        const position = index / (waveformData.length - 1);
        const segmentLength = calculateDistanceBetweenPoints(prevX, prevY, x, y);
        const normalizedSegmentLength = normalizeDistance(segmentLength, displayWidth);
        const angle = calculateAngleBetweenPoints(prevX, prevY, x, y);

        const lineInfo: WaveformLineInfo = {
          position,
          value,
          index,
          distanceToNextPoint: normalizedSegmentLength,
          angle,
        };

        if (getColor) {
          const colorResult: WaveformColorResult = getColor(lineInfo);
          if (typeof colorResult === 'string') {
            ctx.strokeStyle = colorResult;
          } else if (colorResult.type === 'gradient') {
            const gradient = ctx.createLinearGradient(prevX, prevY, x, y);
            colorResult.stops.forEach((stop) => {
              gradient.addColorStop(stop.offset, stop.color);
            });
            ctx.strokeStyle = gradient;
          }
        } else {
          ctx.strokeStyle = color;
        }

        if (smoothingFactor > 0) {
          const {
            firstControlPointX,
            firstControlPointY,
            secondControlPointX,
            secondControlPointY,
          } = calculateBezierControlPoints(prevX, prevY, x, y, smoothingFactor);

          ctx.bezierCurveTo(
            firstControlPointX,
            firstControlPointY,
            secondControlPointX,
            secondControlPointY,
            x,
            y,
          );
        } else {
          ctx.lineTo(x, y);
        }
      }
    });

    ctx.stroke();
  }, [canvasRef, waveformData, lineWidth, heightScale, color, getColor, smoothingFactor]);

  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      drawWaveform();
    }
  }, [isReady, canvasRef, drawWaveform, drawOnCanvasReady]);

  return { canvasRef: setCanvasRef, drawWaveform };
}
