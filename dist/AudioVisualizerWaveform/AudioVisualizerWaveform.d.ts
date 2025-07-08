import { useAudioVisualizerWaveformOptions } from './useAudioVisualizerWaveform';
import { UseAudioAnalyzerOptions } from '../useAudioAnalyzer/useAudioAnalyzer';
import { AudioVisualizerCanvasProps } from '../AudioVisualizerCanvas/AudioVisualizerCanvas';
export type AudioVisualizerWaveformProps = Omit<AudioVisualizerCanvasProps, 'onResize'> & Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> & useAudioVisualizerWaveformOptions;
export declare function AudioVisualizerWaveform(props: AudioVisualizerWaveformProps): import("react/jsx-runtime").JSX.Element;
