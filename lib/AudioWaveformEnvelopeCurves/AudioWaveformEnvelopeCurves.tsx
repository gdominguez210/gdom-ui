import { type ComponentPropsWithRef } from 'react';
import {
  useAudioWaveformEnvelopeCurves,
  type UseAudioWaveformEnvelopeCurvesOptions,
} from './useAudioWaveformEnvelopeCurves';
import { CanvasResponsive } from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioWaveformEnvelopeCurvesProps = UseAudioWaveformEnvelopeCurvesOptions &
  Omit<ComponentPropsWithRef<'canvas'>, 'color'>;

export function AudioWaveformEnvelopeCurves(props: AudioWaveformEnvelopeCurvesProps) {
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
    smoothingFactor,
    ...restProps
  } = props;

  const { canvasRef, handleResize } = useAudioWaveformEnvelopeCurves({
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

  return (
    <CanvasResponsive
      {...restProps}
      ref={mergedRef}
      onResize={handleResize}
    />
  );
}
