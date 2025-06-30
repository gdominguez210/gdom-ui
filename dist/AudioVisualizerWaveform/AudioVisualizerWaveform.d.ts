import { useAudioVisualizerWaveformOptions } from './useAudioVisualizerWaveform';
import { ComponentPropsWithRef } from 'react';
import { UseAudioAnalyzerOptions } from '../useAudioAnalyzer/useAudioAnalyzer';
export type AudioVisualizerWaveformProps = Omit<ComponentPropsWithRef<'canvas'>, 'onResize'> & Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> & useAudioVisualizerWaveformOptions;
export declare function AudioVisualizerWaveform(props: AudioVisualizerWaveformProps): import("react/jsx-runtime").JSX.Element;
