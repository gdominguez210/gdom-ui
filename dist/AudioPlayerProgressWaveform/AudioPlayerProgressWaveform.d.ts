import { AudioWaveformProgressProps } from '../AudioWaveformProgress/AudioWaveformProgress';
export type AudioPlayerProgressWaveformProps = Omit<AudioWaveformProgressProps, 'audioRef' | 'duration' | 'onProgressChange' | 'isActive'>;
export declare function AudioPlayerProgressWaveform(props: AudioPlayerProgressWaveformProps): import("react/jsx-runtime").JSX.Element;
