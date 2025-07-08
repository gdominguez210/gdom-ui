import { useAudioVisualizerFrequencyBarOptions } from './useAudioVisualizerFrequencyBars';
import { UseAudioAnalyzerOptions } from '../useAudioAnalyzer/useAudioAnalyzer';
import { AudioVisualizerCanvasProps } from '../AudioVisualizerCanvas/AudioVisualizerCanvas';
export type AudioVisualizerFrequencyBarsProps = Omit<AudioVisualizerCanvasProps, 'onResize'> & Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> & useAudioVisualizerFrequencyBarOptions;
export declare function AudioVisualizerFrequencyBars(props: AudioVisualizerFrequencyBarsProps): import("react/jsx-runtime").JSX.Element;
