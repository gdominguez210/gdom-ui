import { type ComponentPropsWithRef } from 'react';
import {
  useAudioWaveformEnvelopeRectangles,
  type UseAudioWaveformEnvelopeRectanglesOptions,
} from './useAudioWaveformEnvelopeRectangles';
import { CanvasResponsive } from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioWaveformEnvelopeRectanglesProps = UseAudioWaveformEnvelopeRectanglesOptions &
  Omit<ComponentPropsWithRef<'canvas'>, 'color'>;

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
    ...restProps
  } = props;

  const { canvasRef, handleResize } = useAudioWaveformEnvelopeRectangles({
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

  return (
    <CanvasResponsive
      {...restProps}
      ref={mergedRef}
      onResize={handleResize}
    />
  );
}
