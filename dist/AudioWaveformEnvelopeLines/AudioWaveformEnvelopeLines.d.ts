import { UseAudioWaveformEnvelopeLinesOptions } from './useAudioWaveformEnvelopeLines';
import { CanvasResponsiveProps } from '../CanvasResponsive/CanvasResponsive';
export type AudioWaveformEnvelopeLinesProps = UseAudioWaveformEnvelopeLinesOptions & Omit<CanvasResponsiveProps, 'color'>;
export declare function AudioWaveformEnvelopeLines(props: AudioWaveformEnvelopeLinesProps): import("react/jsx-runtime").JSX.Element;
