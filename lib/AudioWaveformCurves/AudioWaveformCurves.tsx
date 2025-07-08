import { useCallback } from 'react';
import {
  useAudioWaveformCurves,
  type UseAudioWaveformCurvesOptions,
} from './useAudioWaveformCurves';
import {
  CanvasResponsive,
  type CanvasResponsiveProps,
} from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioWaveformCurvesProps = UseAudioWaveformCurvesOptions &
  Omit<CanvasResponsiveProps, 'color'>;

export function AudioWaveformCurves(props: AudioWaveformCurvesProps) {
  const {
    ref,
    color,
    colorTransitionDuration,
    frameRate,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    onResize,
    ...restProps
  } = props;

  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformCurves({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    colorTransitionDuration,
    frameRate,
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
    />
  );
}
