import { UseAudioWaveformEnvelopeCurvesOptions } from './useAudioWaveformEnvelopeCurves';
import { CanvasResponsiveProps } from '../CanvasResponsive/CanvasResponsive';
export type AudioWaveformEnvelopeCurvesProps = UseAudioWaveformEnvelopeCurvesOptions & Omit<CanvasResponsiveProps, 'color'>;
export declare function AudioWaveformEnvelopeCurves(props: AudioWaveformEnvelopeCurvesProps): import("react/jsx-runtime").JSX.Element;
