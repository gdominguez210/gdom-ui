import { jsx } from 'react/jsx-runtime';
import { u as useAudioWaveformEnvelopeRectangles } from './useAudioWaveformEnvelopeRectangles-BnCb3M7c.js';
import { C as CanvasResponsive } from './CanvasResponsive-CTao_uPL.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { useCallback } from 'react';

function AudioWaveformEnvelopeRectangles(props) {
  const {
    ref,
    color,
    colorTransitionDuration,
    frameRate,
    drawOnCanvasReady,
    heightScale,
    data,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    resolutionMode = "high",
    onResize,
    ...restProps
  } = props;
  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformEnvelopeRectangles({
    color,
    colorTransitionDuration,
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
  const handleResize = useCallback(() => {
    handleResizeInternal();
    onResize?.();
  }, [handleResizeInternal, onResize]);
  return /* @__PURE__ */ jsx(
    CanvasResponsive,
    {
      ...restProps,
      ref: mergedRef,
      onResize: handleResize,
      resolutionMode
    }
  );
}

export { AudioWaveformEnvelopeRectangles as A };
