'use strict';

const jsxRuntime = require('react/jsx-runtime');
const colors = require('./colors-PXNKOlE9.js');
const useRefReady = require('./useRefReady-BYj4xHLo.js');
const React = require('react');
const useAudioResponsiveSamplingEnvelopes = require('./useAudioResponsiveSamplingEnvelopes-DQf-Og34.js');
const useColorTransition = require('./useColorTransition-C9Cwz0Jp.js');
const CanvasResponsive = require('./CanvasResponsive-C2Oot7ZB.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');

function useAudioWaveformEnvelopeLines(props) {
  const {
    data,
    color = "#9f9fa9",
    colorTransitionDuration,
    frameRate,
    heightScale = 1,
    lineCap = "butt",
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    gapWidthPercent = 0,
    gapMinWidth = 0,
    gapMaxWidth,
    interpolationFn
  } = props;
  const { segmentsRef, segmentWidthRef, gapWidthRef, calculateSegments } = useAudioResponsiveSamplingEnvelopes.useAudioResponsiveSamplingEnvelopes({
    data,
    segmentMinWidth,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
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
    ctx.imageSmoothingEnabled = false;
    const displayHeight = canvas.clientHeight;
    const displayWidth = canvas.clientWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = segmentWidthRef.current;
    ctx.lineWidth = segmentWidth;
    ctx.lineCap = lineCap;
    let globalGradient = null;
    segments.forEach(({ min, max }, i) => {
      const x = i * (segmentWidth + gapWidthRef.current);
      const minY = centerY + min * maxHeight / 2;
      const maxY = centerY + max * maxHeight / 2;
      const barHeight = Math.abs(maxY - minY);
      const amplitudeRange = Math.abs(max - min);
      const position = segments.length > 1 ? i / (segments.length - 1) : 0;
      const lineX = x + segmentWidth / 2;
      const segmentInfo = {
        position,
        min,
        max,
        index: i,
        widthPercent: segmentWidth / displayWidth,
        widthPixels: segmentWidth,
        amplitudeRange,
        heightPixels: barHeight
      };
      const drawLine = () => {
        ctx.beginPath();
        ctx.moveTo(lineX, minY);
        ctx.lineTo(lineX, maxY);
        ctx.stroke();
      };
      if (typeof color !== "function") {
        ctx.strokeStyle = getColorString();
        drawLine();
        return;
      }
      const colorResult = color(segmentInfo);
      if (typeof colorResult === "string") {
        ctx.strokeStyle = colorResult;
        drawLine();
        return;
      }
      if (colorResult.type === "gradient") {
        const gradientMode = colorResult.mode ?? colors.GRADIENT_MODE.GLOBAL;
        const addColorStops = (gradient2) => {
          colorResult.stops.forEach((stop) => {
            gradient2.addColorStop(stop.offset, stop.color);
          });
        };
        if (gradientMode === colors.GRADIENT_MODE.GLOBAL) {
          if (globalGradient === null) {
            globalGradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
            addColorStops(globalGradient);
          }
          ctx.strokeStyle = globalGradient;
          drawLine();
          return;
        }
        const gradient = ctx.createLinearGradient(
          lineX,
          Math.min(minY, maxY),
          lineX,
          Math.min(minY, maxY) + barHeight
        );
        addColorStops(gradient);
        ctx.strokeStyle = gradient;
        drawLine();
        return;
      }
    });
  }, [
    canvasRef,
    color,
    heightScale,
    lineCap,
    segmentsRef,
    segmentWidthRef,
    gapWidthRef,
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

function AudioWaveformEnvelopeLines(props) {
  const {
    ref,
    color,
    colorTransitionDuration,
    frameRate,
    drawOnCanvasReady,
    heightScale,
    data,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    lineCap,
    resolutionMode = "high",
    onResize,
    ...restProps
  } = props;
  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformEnvelopeLines({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    colorTransitionDuration,
    frameRate,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    lineCap
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
      onResize: handleResize,
      resolutionMode
    }
  );
}

exports.AudioWaveformEnvelopeLines = AudioWaveformEnvelopeLines;
exports.useAudioWaveformEnvelopeLines = useAudioWaveformEnvelopeLines;
