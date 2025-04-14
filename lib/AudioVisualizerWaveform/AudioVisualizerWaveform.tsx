import { useAudioVisualizerWaveform } from '@lib/AudioVisualizerWaveform/useAudioVisualizerWaveform';
import { type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import {
  useAudioAnalyzer,
  type UseAudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';
import { CanvasResponsive } from '@lib/CanvasResponsive/CanvasResponsive';
export type AudioVisualizerWaveformProps = ComponentPropsWithRef<'canvas'> &
  Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'>;

export function AudioVisualizerWaveform(props: AudioVisualizerWaveformProps) {
  const {
    ref,
    isPlaying,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    createAudioSource,
    deleteAudioSource,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    ...restProps
  } = props;

  const { canvasRef, drawWaveform } = useAudioVisualizerWaveform();

  const mergedRef = useComposedRefs(ref, canvasRef);

  useAudioAnalyzer({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    audioContextRef,
    isAudioContextReady,
    isPlaying,
    duration,
    onAnalyze: drawWaveform,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    createAudioSource,
    deleteAudioSource,
  });

  return (
    <CanvasResponsive
      ref={mergedRef}
      {...restProps}
    />
  );
}
