import { AudioContextProviderProps } from '../AudioContextProvider/AudioContextProvider';
export type AudioPlayerContextAudioProviderProps = Omit<AudioContextProviderProps, 'isPlaying'>;
export declare function AudioPlayerContextAudioProvider(props: AudioPlayerContextAudioProviderProps): import("react/jsx-runtime").JSX.Element;
