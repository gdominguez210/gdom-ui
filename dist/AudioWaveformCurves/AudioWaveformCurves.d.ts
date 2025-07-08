import { UseAudioWaveformCurvesOptions } from './useAudioWaveformCurves';
import { CanvasResponsiveProps } from '../CanvasResponsive/CanvasResponsive';
export type AudioWaveformCurvesProps = UseAudioWaveformCurvesOptions & Omit<CanvasResponsiveProps, 'color'>;
export declare function AudioWaveformCurves(props: AudioWaveformCurvesProps): import("react/jsx-runtime").JSX.Element;
