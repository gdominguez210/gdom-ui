import { CanvasResponsive } from '@lib/CanvasResponsive/CanvasResponsive';
import { useEffect, type ComponentPropsWithRef } from 'react';
import { useAudioWaveform, type useAudioWaveformOptions } from './useAudioWaveform';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';

export type AudioWaveformProps = ComponentPropsWithRef<'canvas'> & useAudioWaveformOptions;

export function AudioWaveform(props: AudioWaveformProps) {
  const {
    ref,
    barColor,
    getBarColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    waveformData,
    minBarGapPercent,
    ...restProps
  } = props;

  const { canvasRef, drawWaveform } = useAudioWaveform({
    barColor,
    getBarColor,
    barGapRatio,
    minBarWidth,
    heightScale,
    waveformData,
    minBarGapPercent,
  });

  const mergedRefs = useComposedRefs(canvasRef, ref);

  useEffect(() => {
    drawWaveform();
  }, [drawWaveform]);

  return (
    <CanvasResponsive
      {...restProps}
      ref={mergedRefs}
      onResize={drawWaveform}
    />
  );
}
