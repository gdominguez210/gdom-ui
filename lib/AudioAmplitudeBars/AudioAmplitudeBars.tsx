import type { ComponentPropsWithRef } from 'react';
import { CanvasResponsive } from '@/lib/CanvasResponsive/CanvasResponsive';
import {
  useAudioAmplitudeBars,
  type UseAudioAmplitudeBarsOptions,
} from '@/lib/AudioAmplitudeBars/useAudioAmplitudeBars';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';

export type AudioAmplitudeBarsProps = ComponentPropsWithRef<'canvas'> &
  UseAudioAmplitudeBarsOptions;

export function AudioAmplitudeBars(props: AudioAmplitudeBarsProps) {
  const {
    ref,
    color,
    getColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    amplitudeData,
    minBarGapPercent,
    ...restProps
  } = props;

  const { canvasRef, drawWaveform } = useAudioAmplitudeBars({
    color,
    getColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    amplitudeData,
    minBarGapPercent,
  });

  const mergedRefs = useComposedRefs(canvasRef, ref);

  return (
    <CanvasResponsive
      {...restProps}
      ref={mergedRefs}
      onResize={drawWaveform}
    />
  );
}
