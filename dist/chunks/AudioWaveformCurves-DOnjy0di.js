import { jsx } from 'react/jsx-runtime';
import { useCallback, useEffect } from 'react';
import { u as useRefReady } from './useRefReady-BB-Es_A6.js';
import { u as useAudioResponsiveSamplingForCurves } from './useAudioResponsiveSamplingCurves-DEl5qRPj.js';
import { u as useColorTransition } from './useColorTransition-CWfqaoCT.js';
import { C as CanvasResponsive } from './CanvasResponsive-CTao_uPL.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';

function useAudioWaveformCurves(props) {
  const {
    data,
    color = "#9f9fa9",
    colorTransitionDuration,
    frameRate,
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    interpolationFn,
    lineWidth = 2,
    lineCap = "round",
    smoothingFactor = 0.5
  } = props;
  const { getValues, getSegmentWidth, calculateSegments } = useAudioResponsiveSamplingForCurves({
    data,
    segmentMinWidth,
    interpolationFn
  });
  const { getColorString, currentColor } = useColorTransition({
    targetColor: typeof color === "string" ? color : "#000000",
    colorTransitionDuration,
    frameRate
  });
  const [setCanvasRef, isReady, canvasRef] = useRefReady(null);
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const values = getValues();
    if (!canvas || values.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const displayHeight = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = getSegmentWidth();
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
      ctx.strokeStyle = getColorString();
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
    getValues,
    getSegmentWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    getColorString
  ]);
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    calculateSegments(canvas.clientWidth);
    drawWaveform();
  }, [canvasRef, calculateSegments, drawWaveform]);
  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      calculateSegments(canvasRef.current.clientWidth);
    }
  }, [isReady, canvasRef, drawOnCanvasReady, calculateSegments]);
  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      drawWaveform();
    }
  }, [isReady, canvasRef, drawOnCanvasReady, drawWaveform, currentColor, calculateSegments]);
  return { canvasRef: setCanvasRef, drawWaveform, calculateSegments, handleResize };
}

function AudioWaveformCurves(props) {
  const {
    ref,
    color,
    colorTransitionDuration,
    frameRate,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    onResize,
    ...restProps
  } = props;
  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformCurves({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    colorTransitionDuration,
    frameRate
  });
  const mergedRef = useComposedRefs(ref, canvasRef);
  const handleResize = useCallback(() => {
    handleResizeInternal();
    onResize?.();
  }, [handleResizeInternal, onResize]);
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
