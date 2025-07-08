'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const CanvasResponsive = require('../chunks/CanvasResponsive-C2Oot7ZB.js');
const React = require('react');
const useRefReady = require('../chunks/useRefReady-BYj4xHLo.js');
const index = require('../chunks/index-BvA9FYyc.js');
const useComposedRefs = require('../chunks/useComposedRefs-CewP366o.js');

function calculateMinGapWidth(displayWidth, minGapPercent = 1e-3) {
  return Math.max(1, displayWidth * minGapPercent);
}
function getActualGapWidth(displayWidth, barGapRatio, minGapPercent = 1e-3) {
  if (barGapRatio === 0 || minGapPercent === 0) {
    return 0;
  }
  const minGapWidth = calculateMinGapWidth(displayWidth, minGapPercent);
  const desiredGapWidth = displayWidth * barGapRatio;
  return Math.max(minGapWidth, desiredGapWidth);
}
function calculateBarWidth(displayWidth, numBars, gapWidth, minBarWidth) {
  const totalGapWidth = (numBars - 1) * gapWidth;
  const availableWidthForBars = displayWidth - totalGapWidth;
  return Math.max(minBarWidth, availableWidthForBars / numBars);
}

function calculateSamplingRate(dataLength, maxSegmentsInView) {
  if (dataLength <= maxSegmentsInView) {
    return 1;
  }
  return Math.ceil(dataLength / maxSegmentsInView);
}

function sampleAudioData(audioData, samplingRate) {
  if (samplingRate === 1) {
    return audioData;
  }
  return audioData.filter((_, i) => i % samplingRate === 0);
}

const useAudioAmplitudeBars = (options) => {
  const {
    amplitudeData,
    color = "#9f9fa9",
    getColor,
    barGapRatio = 35e-4,
    heightScale = 1,
    minBarWidth = 1,
    minBarGapPercent = 1e-3,
    drawOnCanvasReady = true
  } = options;
  const [setCanvasRef, isReady, canvasRef] = useRefReady.useRefReady(null);
  const drawWaveform = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !amplitudeData.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gapWidth = getActualGapWidth(displayWidth, barGapRatio, minBarGapPercent);
    const maxBarsInView = index.calculateMaxSegmentsInView(displayWidth, minBarWidth, gapWidth);
    const samplingRate = calculateSamplingRate(amplitudeData.length, maxBarsInView);
    const displayData = sampleAudioData(amplitudeData, samplingRate);
    const barWidth = calculateBarWidth(displayWidth, displayData.length, gapWidth, minBarWidth);
    const centerY = displayHeight / 2;
    const maxBarHeight = displayHeight * heightScale;
    displayData.forEach((value, index) => {
      const isGapless = barGapRatio === 0 || minBarGapPercent === 0;
      const x = isGapless ? Math.round(index * barWidth) : index * (barWidth + gapWidth);
      const barHeight = value * maxBarHeight;
      const originalIndex = index * samplingRate;
      const position = amplitudeData.length > 1 ? originalIndex / (amplitudeData.length - 1) : 0;
      const barInfo = {
        position,
        value,
        index: originalIndex,
        width: barWidth / displayWidth
      };
      if (getColor) {
        const barColorResult = getColor(barInfo);
        if (typeof barColorResult === "string") {
          ctx.fillStyle = barColorResult;
        } else if (barColorResult.type === "gradient") {
          const gradient = ctx.createLinearGradient(
            x,
            centerY + barHeight / 2,
            x,
            centerY - barHeight / 2
          );
          barColorResult.stops.forEach((stop) => {
            gradient.addColorStop(stop.offset, stop.color);
          });
          ctx.fillStyle = gradient;
        }
      } else {
        ctx.fillStyle = color;
      }
      const effectiveBarWidth = isGapless ? Math.ceil(barWidth) : barWidth;
      ctx.fillRect(x, centerY - barHeight / 2, effectiveBarWidth, barHeight);
    });
  }, [
    color,
    canvasRef,
    getColor,
    heightScale,
    amplitudeData,
    barGapRatio,
    minBarGapPercent,
    minBarWidth
  ]);
  React.useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      drawWaveform();
    }
  }, [isReady, canvasRef, drawWaveform, drawOnCanvasReady]);
  return { canvasRef: setCanvasRef, drawWaveform };
};

function AudioAmplitudeBars(props) {
  const {
    ref,
    color,
    getColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    amplitudeData,
    minBarGapPercent,
    ...restProps
  } = props;
  const { canvasRef, drawWaveform } = useAudioAmplitudeBars({
    color,
    getColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    amplitudeData,
    minBarGapPercent
  });
  const mergedRefs = useComposedRefs.useComposedRefs(canvasRef, ref);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      ...restProps,
      ref: mergedRefs,
      onResize: drawWaveform
    }
  );
}

exports.AudioAmplitudeBars = AudioAmplitudeBars;
exports.useAudioAmplitudeBars = useAudioAmplitudeBars;
