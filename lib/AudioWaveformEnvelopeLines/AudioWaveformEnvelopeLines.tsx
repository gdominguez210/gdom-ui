import {
  useAudioWaveformEnvelopeLines,
  type UseAudioWaveformEnvelopeLinesOptions,
} from '@/lib/AudioWaveformEnvelopeLines/useAudioWaveformEnvelopeLines';
import {
  CanvasResponsive,
  type CanvasResponsiveProps,
} from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { useCallback } from 'react';

export type AudioWaveformEnvelopeLinesProps = UseAudioWaveformEnvelopeLinesOptions &
  Omit<CanvasResponsiveProps, 'color'>;

export function AudioWaveformEnvelopeLines(props: AudioWaveformEnvelopeLinesProps) {
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
    lineCap,
    resolutionMode = 'high',
    onResize,
    ...restProps
  } = props;

  const { canvasRef, handleResize: handleResizeInternal } = useAudioWaveformEnvelopeLines({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    colorTransitionDuration,
    frameRate,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    lineCap,
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
