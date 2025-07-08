import { UseAudioWaveformEnvelopeRectanglesOptions } from './useAudioWaveformEnvelopeRectangles';
import { CanvasResponsiveProps } from '../CanvasResponsive/CanvasResponsive';
export type AudioWaveformEnvelopeRectanglesProps = UseAudioWaveformEnvelopeRectanglesOptions & Omit<CanvasResponsiveProps, 'color'>;
export declare function AudioWaveformEnvelopeRectangles(props: AudioWaveformEnvelopeRectanglesProps): import("react/jsx-runtime").JSX.Element;
