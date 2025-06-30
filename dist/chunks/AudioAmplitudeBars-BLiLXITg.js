'use strict';

const jsxRuntime = require('react/jsx-runtime');
const CanvasResponsive = require('./CanvasResponsive-Bryn-OAD.js');
const useAudioAmplitudeBars = require('./useAudioAmplitudeBars-CemT28K7.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');

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
  const { canvasRef, drawWaveform } = useAudioAmplitudeBars.useAudioAmplitudeBars({
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
