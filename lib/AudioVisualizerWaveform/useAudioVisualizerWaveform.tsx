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

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Setup for drawing the waveform
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.beginPath();

      // Calculate how much horizontal space each data point gets
      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;

      dataArray.forEach((value, index) => {
        // Convert data range (0-255) to y-coordinate
        const normalized = value / 128.0; // Convert to range ~0-2
        const y = (normalized * canvas.height) / 2; // Scale to canvas height

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      });

      // Complete the path and render
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    },
    [lineColor, lineWidth],
  );

  return { canvasRef, drawWaveform };
}
