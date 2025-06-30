import { ComponentPropsWithRef } from 'react';
import { UseAudioWaveformEnvelopeRectanglesOptions } from './useAudioWaveformEnvelopeRectangles';
export type AudioWaveformEnvelopeRectanglesProps = UseAudioWaveformEnvelopeRectanglesOptions & Omit<ComponentPropsWithRef<'canvas'>, 'color'>;
export declare function AudioWaveformEnvelopeRectangles(props: AudioWaveformEnvelopeRectanglesProps): import("react/jsx-runtime").JSX.Element;
