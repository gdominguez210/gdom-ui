import { jsx } from 'react/jsx-runtime';
import { C as CanvasResponsive } from './CanvasResponsive-DZEodUk-.js';
import { u as useAudioWaveform } from './useAudioWaveform-rf3ENNmt.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';

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
  const { canvasRef, drawWaveform } = useAudioWaveform({
    barColor,
    getBarColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    waveformData,
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

export { AudioWaveform as A };
