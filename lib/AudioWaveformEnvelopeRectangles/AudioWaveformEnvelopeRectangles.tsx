import {
  useAudioWaveformEnvelopeRectangles,
  type UseAudioWaveformEnvelopeRectanglesOptions,
} from './useAudioWaveformEnvelopeRectangles';
import {
  CanvasResponsive,
  type CanvasResponsiveProps,
} from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { useCallback } from 'react';

export type AudioWaveformEnvelopeRectanglesProps = UseAudioWaveformEnvelopeRectanglesOptions &
  Omit<CanvasResponsiveProps, 'color'>;

export function AudioWaveformEnvelopeRectangles(props: AudioWaveformEnvelopeRectanglesProps) {
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
    resolutionMode = 'high',
    onResize,
    ...restProps
  } = props;

  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformEnvelopeRectangles({
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
  });

  const mergedRef = useComposedRefs(ref, canvasRef);

  const handleResize = useCallback(() => {
    handleResizeInternal();
    onResize?.();
  }, [handleResizeInternal, onResize]);

  return (
    <CanvasResponsive
      {...restProps}
      ref={mergedRef}
      onResize={handleResize}
      resolutionMode={resolutionMode}
    />
  );
}
