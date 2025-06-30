import { AudioVisualizerFrequencyBarsProps } from '../AudioVisualizerFrequencyBars/AudioVisualizerFrequencyBars';
export type AudioPlayerVisualizerFrequencyBarsProps = Omit<AudioVisualizerFrequencyBarsProps, 'isActive' | 'audioRef' | 'duration' | 'audioContextRef' | 'isAudioContextReady' | 'createAudioSource' | 'deleteAudioSource'>;
export declare function AudioPlayerVisualizerFrequencyBars(props: AudioPlayerVisualizerFrequencyBarsProps): import("react/jsx-runtime").JSX.Element;
