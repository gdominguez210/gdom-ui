'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const getColorByDynamicIntensity = require('./getColorByDynamicIntensity-BLuWXMfD.js');
const useColorTransition = require('./useColorTransition-C9Cwz0Jp.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const useLatest = require('./useLatest-rOeU5Z3P.js');
const useAudioAnalyzer = require('./useAudioAnalyzer-ePtfnNIm.js');
const AudioVisualizerCanvas = require('./AudioVisualizerCanvas-pZ-TFTVa.js');

const MAX_AUDIO_VALUE = 255;
const MAX_NORMALIZED_VALUE = 1;
const FREQUENCY_DISTRIBUTION = {
  /**
   * Base value for logarithmic scale (higher = steeper curve)
   */
  LOG_BASE: 1.1,
  /**
   * Exponent multiplier controlling distribution shape
   * Higher values give more emphasis to lower frequencies
   */
  EXPONENT_MULTIPLIER: 19,
  /**
   * Offset value to shift the logarithmic curve to start at zero.
   * Since Math.pow(base, 0) = 1, we subtract 1 to make the curve start at 0.
   */
  ZERO_POINT_OFFSET: 1
};
function calculateLogarithmicDistributionDenominator() {
  return Math.pow(FREQUENCY_DISTRIBUTION.LOG_BASE, FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER) - FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET;
}
function calculateLogarithmicIndexRatio(index, barCount) {
  return index / barCount;
}
function calculateLogarithmicIndex(ratio, dataArrayLength, denominator) {
  if (dataArrayLength <= 0) return 0;
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  return Math.round(
    (Math.pow(
      FREQUENCY_DISTRIBUTION.LOG_BASE,
      FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER * clampedRatio
    ) - FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET) / denominator * (dataArrayLength - 1)
  );
}
function calculateAmplifiedValue(normalizedValue, minHeight) {
  const clampedValue = Math.max(0, Math.min(1, normalizedValue));
  if (minHeight >= 1) return 1;
  const result = minHeight + clampedValue * (MAX_NORMALIZED_VALUE - minHeight);
  return Math.round(result * 100) / 100;
}
function calculateFrequencyBandAverage(dataArray, startIndex, endIndex, maxValue = MAX_AUDIO_VALUE) {
  let sum = 0;
  let sampleCount = 0;
  for (let j = startIndex; j <= endIndex; j++) {
    if (j < dataArray.length) {
      sum += dataArray[j] ?? 0;
      sampleCount++;
    }
  }
  const rawAverage = sampleCount > 0 ? sum / sampleCount : 0;
  const normalizedValue = rawAverage / maxValue;
  return { normalizedValue, rawAverage };
}

const FREQUENCY_BARS_COLOR_MODES = {
  STATIC: "static",
  FREQUENCY: "frequency",
  INTENSITY: "intensity",
  SPECTRUM: "spectrum",
  DYNAMIC: "dynamic"
};
function getBarColor(currentColor, colorMode, positionRatio, intensityRatio) {
  switch (colorMode) {
    case FREQUENCY_BARS_COLOR_MODES.FREQUENCY:
      return getColorByDynamicIntensity.getColorByFrequencyPosition(currentColor, positionRatio);
    case FREQUENCY_BARS_COLOR_MODES.INTENSITY:
      return getColorByDynamicIntensity.getColorByAudioIntensity(currentColor, intensityRatio);
    case FREQUENCY_BARS_COLOR_MODES.SPECTRUM:
      return getColorByDynamicIntensity.getColorBySpectrum(currentColor, positionRatio);
    case FREQUENCY_BARS_COLOR_MODES.DYNAMIC:
      return getColorByDynamicIntensity.getColorByDynamicIntensity(currentColor, intensityRatio);
  }
}

function useAudioVisualizerFrequencyBars(options) {
  const {
    barColor = "#FFFFFF",
    barGapRatio = 4e-3,
    barCount = 128,
    heightMultiplier = 1,
    minBarHeight = 0,
    minBarWidth = 1,
    colorMode = FREQUENCY_BARS_COLOR_MODES.STATIC,
    colorTransitionDuration = 1e3,
    frameRate
  } = options || {};
  const canvasRef = React.useRef(null);
  const clearCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);
  const { getColorString, getCurrentColor } = useColorTransition.useColorTransition({
    targetColor: barColor,
    colorTransitionDuration,
    frameRate
  });
  const drawFrequencyBars = React.useCallback(
    (dataArray) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (colorMode === FREQUENCY_BARS_COLOR_MODES.STATIC) {
        ctx.fillStyle = getColorString();
      }
      const gapWidth = displayWidth * barGapRatio;
      const totalGapWidth = (barCount - 1) * gapWidth;
      const barWidth = Math.max(minBarWidth, (displayWidth - totalGapWidth) / barCount);
      const logDistributionDenominator = calculateLogarithmicDistributionDenominator();
      for (let i = 0; i < barCount; i++) {
        const ratio = calculateLogarithmicIndexRatio(i, barCount);
        const logIndex = calculateLogarithmicIndex(
          ratio,
          dataArray.length,
          logDistributionDenominator
        );
        const nextRatio = calculateLogarithmicIndexRatio(i + 1, barCount);
        const nextLogIndex = calculateLogarithmicIndex(
          nextRatio,
          dataArray.length,
          logDistributionDenominator
        );
        const { normalizedValue } = calculateFrequencyBandAverage(
          dataArray,
          logIndex,
          nextLogIndex
        );
        const amplifiedValue = calculateAmplifiedValue(normalizedValue, minBarHeight);
        const barHeight = Math.min(
          displayHeight,
          amplifiedValue * displayHeight * heightMultiplier
        );
        const x = i * (barWidth + gapWidth);
        const positionRatio = i / barCount;
        const intensityRatio = normalizedValue;
        if (colorMode !== FREQUENCY_BARS_COLOR_MODES.STATIC) {
          const dynamicColor = getBarColor(
            getCurrentColor(),
            colorMode,
            positionRatio,
            intensityRatio
          );
          ctx.fillStyle = dynamicColor;
        }
        ctx.fillRect(x, displayHeight - barHeight, barWidth, barHeight);
      }
    },
    [
      barCount,
      heightMultiplier,
      minBarHeight,
      colorMode,
      barGapRatio,
      getColorString,
      getCurrentColor,
      minBarWidth
    ]
  );
  return { canvasRef, drawFrequencyBars, clearCanvas };
}

function AudioVisualizerFrequencyBars(props) {
  const {
    ref,
    isActive,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    frameTransitionSmoothing,
    createAudioSource,
    deleteAudioSource,
    barColor,
    barGapRatio,
    barCount,
    heightMultiplier,
    minBarHeight,
    colorMode,
    colorTransitionDuration,
    ...restProps
  } = props;
  const { canvasRef, drawFrequencyBars, clearCanvas } = useAudioVisualizerFrequencyBars({
    barColor,
    barGapRatio,
    barCount,
    heightMultiplier,
    minBarHeight,
    colorMode,
    colorTransitionDuration,
    frameRate
  });
  const isActiveRef = useLatest.useLatest(isActive);
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  useAudioAnalyzer.useAudioAnalyzer({
    audioRef,
    audioContextRef,
    isAudioContextReady,
    isActive,
    duration,
    onAnalyze: drawFrequencyBars,
    dataType: "frequency",
    fftSize,
    smoothingTimeConstant,
    frameRate,
    frameTransitionSmoothing,
    createAudioSource,
    deleteAudioSource
  });
  React.useEffect(() => {
    if (!isActiveRef.current) {
      clearCanvas();
    }
  }, [duration, isActiveRef, clearCanvas]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioVisualizerCanvas.AudioVisualizerCanvas,
    {
      ref: mergedRef,
      frameRate,
      ...restProps
    }
  );
}

exports.AudioVisualizerFrequencyBars = AudioVisualizerFrequencyBars;
