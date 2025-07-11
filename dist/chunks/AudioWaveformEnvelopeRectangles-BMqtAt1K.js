'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioWaveformEnvelopeRectangles = require('./useAudioWaveformEnvelopeRectangles-BnxfCDGJ.js');
const CanvasResponsive = require('./CanvasResponsive-DOgOr0T8.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const React = require('react');

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
  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformEnvelopeRectangles.useAudioWaveformEnvelopeRectangles({
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
  const mergedRef = useComposedRefs.useComposedRefs(ref, canvasRef);
  const handleResize = React.useCallback(() => {
    handleResizeInternal();
    onResize?.();
  }, [handleResizeInternal, onResize]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CanvasResponsive.CanvasResponsive,
    {
      ...restProps,
      ref: mergedRef,
      onResize: handleResize,
      resolutionMode
    }
  );
}

exports.AudioWaveformEnvelopeRectangles = AudioWaveformEnvelopeRectangles;
