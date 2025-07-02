'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useRefReady = require('./useRefReady-BYj4xHLo.js');
const useAudioResponsiveSamplingEnvelopes = require('./useAudioResponsiveSamplingEnvelopes-yGDrUPku.js');
const useColorTransition = require('./useColorTransition-CTWDmqrb.js');
const CanvasResponsive = require('./CanvasResponsive-Bryn-OAD.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');

function useAudioWaveformEnvelopeCurves(options) {
  const {
    data,
    color = "#9f9fa9",
    colorTransitionDuration,
    frameRate,
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    interpolationFn,
    smoothingFactor = 0.5
  } = options;
  const { segmentsRef, segmentWidthRef, calculateSegments } = useAudioResponsiveSamplingEnvelopes.useAudioResponsiveSamplingEnvelopes({
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
    const segments = segmentsRef.current;
    if (!canvas || segments.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const displayHeight = canvas.clientHeight;
    const displayWidth = canvas.clientWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = segmentWidthRef.current;
    ctx.beginPath();
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (!segment) continue;
      const { max } = segment;
      const x = i * segmentWidth + segmentWidth / 2;
      const maxY = centerY + max * maxHeight / 2;
      if (i === 0) {
        ctx.moveTo(0, maxY);
        ctx.lineTo(x, maxY);
      } else if (i === segments.length - 1) {
        const prevX = (i - 1) * segmentWidth + segmentWidth / 2;
        const controlX = prevX + (x - prevX) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, maxY, x, maxY);
        ctx.lineTo(displayWidth, maxY);
      } else {
        const prevX = (i - 1) * segmentWidth + segmentWidth / 2;
        const controlX = prevX + (x - prevX) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, maxY, x, maxY);
      }
    }
    for (let i = segments.length - 1; i >= 0; i--) {
      const segment = segments[i];
      if (!segment) continue;
      const { min } = segment;
      const x = i * segmentWidth + segmentWidth / 2;
      const minY = centerY + min * maxHeight / 2;
      if (i === segments.length - 1) {
        ctx.lineTo(x, minY);
      } else if (i === 0) {
        const nextX = (i + 1) * segmentWidth + segmentWidth / 2;
        const controlX = x + (nextX - x) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, minY, x, minY);
        ctx.lineTo(0, minY);
      } else {
        const nextX = (i + 1) * segmentWidth + segmentWidth / 2;
        const controlX = x + (nextX - x) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, minY, x, minY);
      }
    }
    ctx.closePath();
    if (typeof color !== "function") {
      ctx.fillStyle = getColorString();
      ctx.fill();
      return;
    }
    const colorResult = color();
    if (typeof colorResult === "string") {
      ctx.fillStyle = colorResult;
      ctx.fill();
      return;
    }
    if (colorResult.type === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
      colorResult.stops.forEach((stop) => {
        gradient.addColorStop(stop.offset, stop.color);
      });
      ctx.fillStyle = gradient;
      ctx.fill();
      return;
    }
  }, [
    canvasRef,
    color,
    heightScale,
    segmentsRef,
    segmentWidthRef,
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
  }, [isReady, canvasRef, drawOnCanvasReady, drawWaveform, currentColor]);
  return { canvasRef: setCanvasRef, drawWaveform, calculateSegments, handleResize };
}

function AudioWaveformEnvelopeCurves(props) {
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
    smoothingFactor,
    ...restProps
  } = props;
  const { canvasRef, handleResize } = useAudioWaveformEnvelopeCurves({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    smoothingFactor,
    colorTransitionDuration,
    frameRate
  });
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      ...restProps,
      ref: mergedRef,
      onResize: handleResize
    }
  );
}

exports.AudioWaveformEnvelopeCurves = AudioWaveformEnvelopeCurves;
exports.useAudioWaveformEnvelopeCurves = useAudioWaveformEnvelopeCurves;
