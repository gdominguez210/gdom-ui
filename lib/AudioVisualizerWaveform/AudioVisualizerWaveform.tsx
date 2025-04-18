import {
  useAudioVisualizerWaveform,
  type useAudioVisualizerWaveformOptions,
} from '@lib/AudioVisualizerWaveform/useAudioVisualizerWaveform';
import { type ComponentPropsWithRef, type RefObject } from 'react';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import {
  useAudioAnalyzer,
  type UseAudioAnalyzerOptions,
} from '@lib/useAudioAnalyzer/useAudioAnalyzer';
import { AudioVisualizerCanvas } from '@lib/AudioVisualizerCanvas/AudioVisualizerCanvas';

export type AudioVisualizerWaveformProps = Omit<ComponentPropsWithRef<'canvas'>, 'onResize'> &
  Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> &
  useAudioVisualizerWaveformOptions;

export function AudioVisualizerWaveform(props: AudioVisualizerWaveformProps) {
  const {
    ref,
    isActive,
    audioRef,
    duration,
    audioContextRef,
    isAudioContextReady,
    createAudioSource,
    deleteAudioSource,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    colorMode,
    lineColor,
    lineWidth,
    segmentCount,
    ...restProps
  } = props;

  const { canvasRef, drawWaveform } = useAudioVisualizerWaveform({
    colorMode,
    lineColor,
    lineWidth,
    segmentCount,
  });

  const mergedRef = useComposedRefs(ref, canvasRef);

  useAudioAnalyzer({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    audioContextRef,
    isAudioContextReady,
    isActive,
    duration,
    onAnalyze: drawWaveform,
    fftSize,
    smoothingTimeConstant,
    frameRate,
    createAudioSource,
    deleteAudioSource,
  });

  return (
    <AudioVisualizerCanvas
      ref={mergedRef}
      frameRate={frameRate}
      {...restProps}
    />
  );
}
