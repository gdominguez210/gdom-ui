import { jsx } from 'react/jsx-runtime';
import { useRef, useCallback, useEffect } from 'react';
import { g as getColorByDynamicIntensity, a as getColorBySpectrum, b as getColorByFrequencyPosition, c as getColorByAudioIntensity } from './getColorByDynamicIntensity-D1nI7ps2.js';
import { u as useColorTransition } from './useColorTransition-j98910EB.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { u as useLatest } from './useLatest-CIF2WkZQ.js';
import { u as useAudioAnalyzer } from './useAudioAnalyzer-UJCiycqx.js';
import { A as AudioVisualizerCanvas } from './AudioVisualizerCanvas-DMPy4Stc.js';

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
      ctx.strokeStyle = getColorByAudioIntensity(currentColor, amplitudeRatio);
      break;
    case WAVEFORM_COLOR_MODES.FREQUENCY:
      ctx.strokeStyle = getColorByFrequencyPosition(currentColor, positionRatio);
      break;
    case WAVEFORM_COLOR_MODES.SPECTRUM:
      ctx.strokeStyle = getColorBySpectrum(currentColor, positionRatio);
      break;
    case WAVEFORM_COLOR_MODES.DYNAMIC:
      ctx.strokeStyle = getColorByDynamicIntensity(currentColor, amplitudeRatio);
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
  const { getColorString, getCurrentColor } = useColorTransition({
    targetColor: lineColor,
    colorTransitionDuration,
    frameRate
  });
  const canvasRef = useRef(null);
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);
  const drawWaveform = useCallback(
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
  const isActiveRef = useLatest(isActive);
  const mergedRef = useComposedRefs(ref, canvasRef);
  useAudioAnalyzer({
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
  useEffect(() => {
    if (!isActiveRef.current) {
      clearCanvas();
    }
  }, [duration, isActiveRef, clearCanvas]);
  return /* @__PURE__ */ jsx(
    AudioVisualizerCanvas,
    {
      ref: mergedRef,
      frameRate,
      ...restProps
    }
  );
}

export { AudioVisualizerWaveform as A, useAudioVisualizerWaveform as u };
