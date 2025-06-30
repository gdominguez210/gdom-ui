import { ComponentPropsWithRef } from 'react';
import { UseAudioWaveformEnvelopeLinesOptions } from './useAudioWaveformEnvelopeLines';
export type AudioWaveformEnvelopeLinesProps = UseAudioWaveformEnvelopeLinesOptions & Omit<ComponentPropsWithRef<'canvas'>, 'color'>;
export declare function AudioWaveformEnvelopeLines(props: AudioWaveformEnvelopeLinesProps): import("react/jsx-runtime").JSX.Element;
