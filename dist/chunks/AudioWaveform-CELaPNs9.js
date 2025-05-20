'use strict';

const jsxRuntime = require('react/jsx-runtime');
const CanvasResponsive = require('./CanvasResponsive-Cm3QMDC_.js');
const useAudioWaveform = require('./useAudioWaveform-B2XCEiuu.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');

function AudioWaveform(props) {
  const {
    ref,
    barColor,
    getBarColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    waveformData,
    minBarGapPercent,
    ...restProps
  } = props;
  const { canvasRef, drawWaveform } = useAudioWaveform.useAudioWaveform({
    barColor,
    getBarColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    waveformData,
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

exports.AudioWaveform = AudioWaveform;
