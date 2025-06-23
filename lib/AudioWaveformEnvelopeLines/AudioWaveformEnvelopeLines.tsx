import { type ComponentPropsWithRef } from 'react';
import {
  useAudioWaveformEnvelopeLines,
  type UseAudioWaveformEnvelopeLinesOptions,
} from '@/lib/AudioWaveformEnvelopeLines/useAudioWaveformEnvelopeLines';
import { CanvasResponsive } from '@/lib/CanvasResponsive/CanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioWaveformEnvelopeLinesProps = UseAudioWaveformEnvelopeLinesOptions &
  Omit<ComponentPropsWithRef<'canvas'>, 'color'>;

export function AudioWaveformEnvelopeLines(props: AudioWaveformEnvelopeLinesProps) {
  const {
    ref,
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    lineCap,
    ...restProps
  } = props;

  const { canvasRef, handleResize } = useAudioWaveformEnvelopeLines({
    color,
    drawOnCanvasReady,
    heightScale,
    data,
    gapWidthPercent,
    gapMinWidth,
    gapMaxWidth,
    interpolationFn,
    segmentMinWidth,
    lineCap,
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
