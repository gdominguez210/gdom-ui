import { jsx } from 'react/jsx-runtime';
import { useCallback, useEffect } from 'react';
import { u as useRefReady } from './useRefReady-BB-Es_A6.js';
import { u as useAudioResponsiveSamplingForCurves } from './useAudioResponsiveSamplingCurves-DUhYvEWG.js';
import { C as CanvasResponsive } from './CanvasResponsive-Cua3Ie3J.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';

function useAudioWaveformCurves(props) {
  const {
    data,
    color = "#9f9fa9",
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    interpolationFn,
    lineWidth = 2,
    lineCap = "round",
    smoothingFactor = 0.5
  } = props;
  const { valuesRef, segmentWidthRef, calculateSegments } = useAudioResponsiveSamplingForCurves({
    data,
    segmentMinWidth,
    interpolationFn
  });
  const [setCanvasRef, isReady, canvasRef] = useRefReady(null);
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const values = valuesRef.current;
    if (!canvas || values.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const displayHeight = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = segmentWidthRef.current;
    ctx.beginPath();
    values.forEach((value, i) => {
      const x = i * segmentWidth + segmentWidth / 2;
      const y = centerY - value * maxHeight / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else if (smoothingFactor === 0) {
        ctx.lineTo(x, y);
      } else {
        const prevX = (i - 1) * segmentWidth + segmentWidth / 2;
        const controlX = prevX + (x - prevX) * smoothingFactor;
        const prevY = centerY - values[i - 1] * maxHeight / 2;
        ctx.quadraticCurveTo(controlX, prevY, x, y);
      }
    });
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.lineJoin = "round";
    if (typeof color !== "function") {
      ctx.strokeStyle = color;
      ctx.stroke();
      return;
    }
    const colorResult = color();
    if (typeof colorResult === "string") {
      ctx.strokeStyle = colorResult;
      ctx.stroke();
      return;
    }
    if (colorResult.type === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
      colorResult.stops.forEach((stop) => {
        gradient.addColorStop(stop.offset, stop.color);
      });
      ctx.strokeStyle = gradient;
      ctx.stroke();
      return;
    }
  }, [
    canvasRef,
    color,
    heightScale,
    valuesRef,
    segmentWidthRef,
    lineWidth,
    lineCap,
    smoothingFactor
  ]);
  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    calculateSegments(canvas.clientWidth);
    drawWaveform();
  }, [canvasRef, calculateSegments, drawWaveform]);
  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      init();
    }
  }, [isReady, canvasRef, drawOnCanvasReady, init]);
  return { canvasRef: setCanvasRef, drawWaveform, calculateSegments, handleResize: init };
}

function AudioWaveformCurves(props) {
  const {
    ref,
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    ...restProps
  } = props;
  const { canvasRef, handleResize } = useAudioWaveformCurves({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor
  });
  const mergedRef = useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsx(
    CanvasResponsive,
    {
      ...restProps,
      ref: mergedRef,
      onResize: handleResize
    }
  );
}

export { AudioWaveformCurves as A };
