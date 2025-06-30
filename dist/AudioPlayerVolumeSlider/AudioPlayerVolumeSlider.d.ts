import { AudioPlayerVolumeSliderPrimitiveProps } from './AudioPlayerVolumeSliderPrimitive';
export type AudioPlayerVolumeSliderProps = Omit<AudioPlayerVolumeSliderPrimitiveProps, 'value'>;
/**
 * Volume slider that integrates with the audio player context
 */
export declare function AudioPlayerVolumeSlider(props: AudioPlayerVolumeSliderProps): import("react/jsx-runtime").JSX.Element;
