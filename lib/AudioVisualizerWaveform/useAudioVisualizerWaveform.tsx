import { useRef, useCallback } from 'react';

export type useAudioVisualizerWaveformProps = {
  /**
   * Color of the waveform line
   */
  lineColor?: string;

  /**
   * Thickness of the waveform line
   */
  lineWidth?: number;
};

export type useAudioVisualizerWaveformReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawWaveform: (dataArray: Uint8Array) => void;
};

export function useAudioVisualizerWaveform(
  options?: useAudioVisualizerWaveformProps,
): useAudioVisualizerWaveformReturn {
  const { lineColor = '#ffffff', lineWidth = 2 } = options || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = useCallback(
    (dataArray: Uint8Array) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Setup for drawing the waveform
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.beginPath();

      // Calculate how much horizontal space each data point gets
      const sliceWidth = displayWidth / dataArray.length;
      let x = 0;

      const centerY = displayHeight / 2;

      dataArray.forEach((value, index) => {
        // Convert data range (0-255) to y-coordinate
        const normalizedOffset = (value - 128) / 128;
        // Center around the middle of the canvas
        // This makes values of 128 align with the center line
        const y = centerY + normalizedOffset * centerY;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      });

      // Complete the path and render
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();
    },
    [lineColor, lineWidth],
  );

  return { canvasRef, drawWaveform };
}
