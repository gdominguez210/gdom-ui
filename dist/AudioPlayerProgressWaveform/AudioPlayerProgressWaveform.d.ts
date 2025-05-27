import { AudioProgressWaveformProps } from '../AudioProgressWaveform/AudioProgressWaveform';
export type AudioPlayerProgressWaveformProps = Omit<AudioProgressWaveformProps, 'audioRef' | 'duration' | 'onProgressChange' | 'isActive'>;
export declare function AudioPlayerProgressWaveform(props: AudioPlayerProgressWaveformProps): import("react/jsx-runtime").JSX.Element;
