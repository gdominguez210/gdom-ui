'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const getColorByDynamicIntensity = require('./getColorByDynamicIntensity-BLuWXMfD.js');
const useColorTransition = require('./useColorTransition-C9Cwz0Jp.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const useLatest = require('./useLatest-rOeU5Z3P.js');
const useAudioAnalyzer = require('./useAudioAnalyzer-ePtfnNIm.js');
const AudioVisualizerCanvas = require('./AudioVisualizerCanvas-pZ-TFTVa.js');

function normalizeAudioValue(value) {
  const normalized = (value - 128) / 128;
  return Math.round(normalized * 100) / 100;
}
function calculateWaveformY(normalizedValue, centerY) {
  return centerY + normalizedValue * centerY;
}
function calculateAmplitudeRatio(normalizedValue) {
  return Math.abs(normalizedValue);
}
function calculatePositionRatio(segmentIndex, totalLength) {
  return segmentIndex / totalLength;
}

const WAVEFORM_COLOR_MODES = {
  STATIC: "static",
  AMPLITUDE: "amplitude",
  FREQUENCY: "frequency",
  SPECTRUM: "spectrum",
  DYNAMIC: "dynamic"
};
function drawStaticWaveform(ctx, dataArray, displayWidth, displayHeight, lineColor) {
  const sliceWidth = displayWidth / dataArray.length;
  const centerY = displayHeight / 2;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  dataArray.forEach((value, index) => {
    const x = index * sliceWidth;
    const normalizedValue = normalizeAudioValue(value);
    const y = calculateWaveformY(normalizedValue, centerY);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
}
function applySegmentColor(ctx, segmentStartIndex, dataArray, currentColor, colorMode) {
  const positionRatio = calculatePositionRatio(segmentStartIndex, dataArray.length);
  const normalizedValue = normalizeAudioValue(dataArray[segmentStartIndex]);
  const amplitudeRatio = calculateAmplitudeRatio(normalizedValue);
  switch (colorMode) {
    case WAVEFORM_COLOR_MODES.AMPLITUDE:
      ctx.strokeStyle = getColorByDynamicIntensity.getColorByAudioIntensity(currentColor, amplitudeRatio);
      break;
    case WAVEFORM_COLOR_MODES.FREQUENCY:
      ctx.strokeStyle = getColorByDynamicIntensity.getColorByFrequencyPosition(currentColor, positionRatio);
      break;
    case WAVEFORM_COLOR_MODES.SPECTRUM:
      ctx.strokeStyle = getColorByDynamicIntensity.getColorBySpectrum(currentColor, positionRatio);
      break;
    case WAVEFORM_COLOR_MODES.DYNAMIC:
      ctx.strokeStyle = getColorByDynamicIntensity.getColorByDynamicIntensity(currentColor, amplitudeRatio);
      break;
  }
}
function drawSegmentedWaveform(ctx, dataArray, displayWidth, displayHeight, baseOklchColor, colorMode, segmentCount) {
  const sliceWidth = displayWidth / dataArray.length;
  const centerY = displayHeight / 2;
  const segmentSize = Math.max(1, Math.floor(dataArray.length / segmentCount));
  let lastX = 0;
  let lastY = 0;
  for (let i = 0; i < dataArray.length; i += segmentSize) {
    const segmentEnd = Math.min(i + segmentSize, dataArray.length);
    ctx.beginPath();
    if (i > 0) {
      ctx.moveTo(lastX, lastY);
    }
    for (let j = i; j < segmentEnd; j++) {
      const x = j * sliceWidth;
      const normalizedValue = normalizeAudioValue(dataArray[j]);
      const y = calculateWaveformY(normalizedValue, centerY);
      if (i === 0 && j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        if (j === segmentEnd - 1) {
          lastX = x;
          lastY = y;
        }
      }
    }
    applySegmentColor(ctx, i, dataArray, baseOklchColor, colorMode);
    ctx.stroke();
  }
}

function useAudioVisualizerWaveform(options) {
  const {
    lineColor = "#ffffff",
    lineWidth = 2,
    frameRate,
    colorMode = WAVEFORM_COLOR_MODES.STATIC,
    segmentCount = 40,
    colorTransitionDuration = 1e3
  } = options || {};
  const { getColorString, getCurrentColor } = useColorTransition.useColorTransition({
    targetColor: lineColor,
    colorTransitionDuration,
    frameRate
  });
  const canvasRef = React.useRef(null);
  const clearCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);
  const drawWaveform = React.useCallback(
    (dataArray) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = lineWidth;
      if (colorMode === WAVEFORM_COLOR_MODES.STATIC) {
        drawStaticWaveform(ctx, dataArray, displayWidth, displayHeight, getColorString());
      } else {
        drawSegmentedWaveform(
          ctx,
          dataArray,
          displayWidth,
          displayHeight,
          getCurrentColor(),
          colorMode,
          segmentCount
        );
      }
    },
    [getCurrentColor, getColorString, lineWidth, colorMode, segmentCount]
  );
  return { canvasRef, drawWaveform, clearCanvas };
}

function AudioVisualizerWaveform(props) {
  const {
    ref,
    isActive,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    createAudioSource,
    deleteAudioSource,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    frameTransitionSmoothing,
    colorMode,
    lineColor,
    lineWidth,
    segmentCount,
    ...restProps
  } = props;
  const { canvasRef, drawWaveform, clearCanvas } = useAudioVisualizerWaveform({
    colorMode,
    lineColor,
    lineWidth,
    segmentCount,
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
    onAnalyze: drawWaveform,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    createAudioSource,
    deleteAudioSource,
    frameTransitionSmoothing
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

exports.AudioVisualizerWaveform = AudioVisualizerWaveform;
exports.useAudioVisualizerWaveform = useAudioVisualizerWaveform;
