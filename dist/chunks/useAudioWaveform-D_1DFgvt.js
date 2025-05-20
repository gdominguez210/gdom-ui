import { useCallback, useRef } from 'react';

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
function calculateMaxBarsInView(displayWidth, minBarWidth, gapWidth) {
  return Math.floor((displayWidth + gapWidth) / (minBarWidth + gapWidth));
}
function calculateSamplingRate(dataLength, maxBarsInView) {
  if (dataLength <= maxBarsInView) {
    return 1;
  }
  return Math.ceil(dataLength / maxBarsInView);
}
function sampleWaveformData(waveformData, samplingRate) {
  if (samplingRate === 1) {
    return waveformData;
  }
  return waveformData.filter((_, i) => i % samplingRate === 0);
}
function calculateBarWidth(displayWidth, numBars, gapWidth, minBarWidth) {
  const totalGapWidth = (numBars - 1) * gapWidth;
  const availableWidthForBars = displayWidth - totalGapWidth;
  return Math.max(minBarWidth, availableWidthForBars / numBars);
}

const useAudioWaveform = (options) => {
  const {
    waveformData,
    barColor = "#9f9fa9",
    getBarColor,
    barGapRatio = 35e-4,
    heightScale = 1,
    minBarWidth = 1,
    minBarGapPercent = 1e-3,
    drawOnCanvasReady = true
  } = options;
  const drawWaveform = useCallback(
    (canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gapWidth = getActualGapWidth(displayWidth, barGapRatio, minBarGapPercent);
      const maxBarsInView = calculateMaxBarsInView(displayWidth, minBarWidth, gapWidth);
      const samplingRate = calculateSamplingRate(waveformData.length, maxBarsInView);
      const displayData = sampleWaveformData(waveformData, samplingRate);
      const barWidth = calculateBarWidth(displayWidth, displayData.length, gapWidth, minBarWidth);
      const centerY = displayHeight / 2;
      const maxBarHeight = displayHeight * heightScale;
      displayData.forEach((value, index) => {
        const isGapless = barGapRatio === 0 || minBarGapPercent === 0;
        const x = isGapless ? Math.round(index * barWidth) : index * (barWidth + gapWidth);
        const barHeight = value * maxBarHeight;
        const originalIndex = index * samplingRate;
        const position = waveformData.length > 1 ? originalIndex / (waveformData.length - 1) : 0;
        const barInfo = {
          position,
          value,
          index: originalIndex,
          width: barWidth / displayWidth
        };
        if (getBarColor) {
          const barColorResult = getBarColor(barInfo);
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
          ctx.fillStyle = barColor;
        }
        const effectiveBarWidth = isGapless ? Math.ceil(barWidth) : barWidth;
        ctx.fillRect(x, centerY - barHeight / 2, effectiveBarWidth, barHeight);
      });
    },
    [barColor, getBarColor, heightScale, waveformData, barGapRatio, minBarWidth, minBarGapPercent]
  );
  const internalCanvasRef = useRef(null);
  const canvasRef = useCallback(
    (element) => {
      internalCanvasRef.current = element;
      if (element && drawOnCanvasReady) {
        drawWaveform(element);
      }
    },
    [drawOnCanvasReady, drawWaveform]
  );
  const redraw = useCallback(() => {
    drawWaveform(internalCanvasRef.current);
  }, [drawWaveform]);
  return { canvasRef, drawWaveform: redraw };
};

export { useAudioWaveform as u };
