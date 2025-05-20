import { useAudioVisualizerFrequencyBarOptions } from './useAudioVisualizerFrequencyBars';
import { ComponentPropsWithRef } from 'react';
import { UseAudioAnalyzerOptions } from '../useAudioAnalyzer/useAudioAnalyzer';
export type AudioVisualizerFrequencyBarsProps = Omit<ComponentPropsWithRef<'canvas'>, 'onResize'> & Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> & useAudioVisualizerFrequencyBarOptions;
export declare function AudioVisualizerFrequencyBars(props: AudioVisualizerFrequencyBarsProps): import("react/jsx-runtime").JSX.Element;
