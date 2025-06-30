import { ComponentPropsWithRef } from 'react';
import { UseAudioWaveformCurvesOptions } from './useAudioWaveformCurves';
export type AudioWaveformCurvesProps = UseAudioWaveformCurvesOptions & Omit<ComponentPropsWithRef<'canvas'>, 'color'>;
export declare function AudioWaveformCurves(props: AudioWaveformCurvesProps): import("react/jsx-runtime").JSX.Element;
