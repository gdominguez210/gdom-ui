'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useRefReady = require('./useRefReady-BYj4xHLo.js');
const useAudioResponsiveSamplingCurves = require('./useAudioResponsiveSamplingCurves-DOk6rkNv.js');
const useColorTransition = require('./useColorTransition-C9Cwz0Jp.js');
const CanvasResponsive = require('./CanvasResponsive-C2Oot7ZB.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');

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
  const { valuesRef, segmentWidthRef, calculateSegments } = useAudioResponsiveSamplingCurves.useAudioResponsiveSamplingForCurves({
    data,
    segmentMinWidth,
    interpolationFn
  });
  const { getColorString, currentColor } = useColorTransition.useColorTransition({
    targetColor: typeof color === "string" ? color : "#000000",
    colorTransitionDuration,
    frameRate
  });
  const [setCanvasRef, isReady, canvasRef] = useRefReady.useRefReady(null);
  const drawWaveform = React.useCallback(() => {
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
    valuesRef,
    segmentWidthRef,
    lineWidth,
    lineCap,
    smoothingFactor,
    getColorString
  ]);
  const handleResize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    calculateSegments(canvas.clientWidth);
    drawWaveform();
  }, [canvasRef, calculateSegments, drawWaveform]);
  React.useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      calculateSegments(canvasRef.current.clientWidth);
    }
  }, [isReady, canvasRef, drawOnCanvasReady, calculateSegments]);
  React.useEffect(() => {
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
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  const handleResize = React.useCallback(() => {
    handleResizeInternal();
    onResize?.();
  }, [handleResizeInternal, onResize]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      ...restProps,
      ref: mergedRef,
      onResize: handleResize
    }
  );
}

exports.AudioWaveformCurves = AudioWaveformCurves;
