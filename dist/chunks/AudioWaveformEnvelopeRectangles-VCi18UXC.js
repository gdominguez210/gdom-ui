import { jsx } from 'react/jsx-runtime';
import { useCallback, useEffect } from 'react';
import { G as GRADIENT_MODE } from './colors-BhJVYq8s.js';
import { u as useRefReady } from './useRefReady-BB-Es_A6.js';
import { u as useAudioResponsiveSamplingEnvelopes } from './useAudioResponsiveSamplingEnvelopes-0IiikLCG.js';
import { C as CanvasResponsive } from './CanvasResponsive-Cua3Ie3J.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';

function useAudioWaveformEnvelopeRectangles(props) {
  const {
    data,
    color = "#9f9fa9",
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    gapWidthPercent = 0,
    gapMinWidth = 0,
    gapMaxWidth,
    interpolationFn
  } = props;
  const { segmentsRef, segmentWidthRef, gapWidthRef, calculateSegments } = useAudioResponsiveSamplingEnvelopes({
    data,
    segmentMinWidth,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn
  });
  const [setCanvasRef, isReady, canvasRef] = useRefReady(null);
  const drawWaveform = useCallback(() => {
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
    let globalGradient = null;
    segments.forEach(({ min, max }, i) => {
      const x = i * (segmentWidth + gapWidthRef.current);
      const minY = centerY + min * maxHeight / 2;
      const maxY = centerY + max * maxHeight / 2;
      const barHeight = Math.abs(maxY - minY);
      const amplitudeRange = Math.abs(max - min);
      const position = segments.length > 1 ? i / (segments.length - 1) : 0;
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
      const fillRect = () => {
        ctx.fillRect(x, Math.min(minY, maxY), segmentWidth, barHeight);
      };
      if (typeof color !== "function") {
        ctx.fillStyle = color;
        fillRect();
        return;
      }
      const colorResult = color(segmentInfo);
      if (typeof colorResult === "string") {
        ctx.fillStyle = colorResult;
        fillRect();
        return;
      }
      if (colorResult.type === "gradient") {
        const gradientMode = colorResult.mode ?? GRADIENT_MODE.GLOBAL;
        const addColorStops = (gradient2) => {
          colorResult.stops.forEach((stop) => {
            gradient2.addColorStop(stop.offset, stop.color);
          });
        };
        if (gradientMode === GRADIENT_MODE.GLOBAL) {
          if (globalGradient === null) {
            globalGradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
            addColorStops(globalGradient);
          }
          ctx.fillStyle = globalGradient;
          fillRect();
          return;
        }
        const gradient = ctx.createLinearGradient(
          x,
          Math.min(minY, maxY),
          x,
          Math.min(minY, maxY) + barHeight
        );
        addColorStops(gradient);
        ctx.fillStyle = gradient;
        fillRect();
        return;
      }
    });
  }, [canvasRef, color, heightScale, segmentsRef, segmentWidthRef, gapWidthRef]);
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

function AudioWaveformEnvelopeRectangles(props) {
  const {
    ref,
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    ...restProps
  } = props;
  const { canvasRef, handleResize } = useAudioWaveformEnvelopeRectangles({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth
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

export { AudioWaveformEnvelopeRectangles as A };
