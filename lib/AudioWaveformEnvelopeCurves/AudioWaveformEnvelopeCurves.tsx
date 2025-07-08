import { useCallback } from 'react';
import {
  useAudioWaveformEnvelopeCurves,
  type UseAudioWaveformEnvelopeCurvesOptions,
} from './useAudioWaveformEnvelopeCurves';
import {
  CanvasResponsive,
  type CanvasResponsiveProps,
} from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioWaveformEnvelopeCurvesProps = UseAudioWaveformEnvelopeCurvesOptions &
  Omit<CanvasResponsiveProps, 'color'>;

export function AudioWaveformEnvelopeCurves(props: AudioWaveformEnvelopeCurvesProps) {
  const {
    ref,
    color,
    colorTransitionDuration,
    frameRate,
    drawOnCanvasReady,
    heightScale,
    data,
    onResize,
    interpolationFn,
    segmentMinWidth,
    smoothingFactor,
    ...restProps
  } = props;

  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformEnvelopeCurves({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
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
