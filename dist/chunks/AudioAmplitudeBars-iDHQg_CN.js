import { jsx } from 'react/jsx-runtime';
import { C as CanvasResponsive } from './CanvasResponsive-Cua3Ie3J.js';
import { u as useAudioAmplitudeBars } from './useAudioAmplitudeBars-C8toOg0X.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';

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
  const mergedRefs = useComposedRefs(canvasRef, ref);
  return /* @__PURE__ */ jsx(
    CanvasResponsive,
    {
      ...restProps,
      ref: mergedRefs,
      onResize: drawWaveform
    }
  );
}

export { AudioAmplitudeBars as A };
