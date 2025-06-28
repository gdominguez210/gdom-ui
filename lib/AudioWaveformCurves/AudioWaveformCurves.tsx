import { type ComponentPropsWithRef } from 'react';
import {
  useAudioWaveformCurves,
  type UseAudioWaveformCurvesOptions,
} from './useAudioWaveformCurves';
import { CanvasResponsive } from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioWaveformCurvesProps = UseAudioWaveformCurvesOptions &
  Omit<ComponentPropsWithRef<'canvas'>, 'color'>;

export function AudioWaveformCurves(props: AudioWaveformCurvesProps) {
  const {
    ref,
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
    ...restProps
  } = props;

  const { canvasRef, handleResize } = useAudioWaveformCurves({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    interpolationFn,
    segmentMinWidth,
    lineWidth,
    lineCap,
    smoothingFactor,
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
