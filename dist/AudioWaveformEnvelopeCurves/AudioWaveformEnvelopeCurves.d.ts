import { ComponentPropsWithRef } from 'react';
import { UseAudioWaveformEnvelopeCurvesOptions } from './useAudioWaveformEnvelopeCurves';
export type AudioWaveformEnvelopeCurvesProps = UseAudioWaveformEnvelopeCurvesOptions & Omit<ComponentPropsWithRef<'canvas'>, 'color'>;
export declare function AudioWaveformEnvelopeCurves(props: AudioWaveformEnvelopeCurvesProps): import("react/jsx-runtime").JSX.Element;
