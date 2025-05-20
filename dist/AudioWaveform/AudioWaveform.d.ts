import { ComponentPropsWithRef } from 'react';
import { useAudioWaveformOptions } from './useAudioWaveform';
export type AudioWaveformProps = ComponentPropsWithRef<'canvas'> & useAudioWaveformOptions;
export declare function AudioWaveform(props: AudioWaveformProps): import("react/jsx-runtime").JSX.Element;
