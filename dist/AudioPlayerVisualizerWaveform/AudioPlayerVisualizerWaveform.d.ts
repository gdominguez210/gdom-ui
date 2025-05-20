import { AudioVisualizerWaveformProps } from '../AudioVisualizerWaveform/AudioVisualizerWaveform';
export type AudioPlayerVisualizerWaveformProps = Omit<AudioVisualizerWaveformProps, 'isActive' | 'audioRef' | 'duration' | 'audioContextRef' | 'isAudioContextReady' | 'createAudioSource' | 'deleteAudioSource'>;
export declare function AudioPlayerVisualizerWaveform(props: AudioPlayerVisualizerWaveformProps): import("react/jsx-runtime").JSX.Element;
