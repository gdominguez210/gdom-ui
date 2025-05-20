import { AudioPlayerImagePrimitiveProps } from '../AudioPlayerImage/AudioPlayerImagePrimitive';
import { ElementType } from 'react';
/**
 * Props for the audio playlist track image component
 */
export type AudioPlaylistTrackImagePrimitiveProps<T extends ElementType = 'div'> = AudioPlayerImagePrimitiveProps<T> & {
    active?: boolean;
    isPlaying?: boolean;
};
/**
 * Component for displaying an audio playlist track image
 */
export declare function AudioPlaylistTrackImagePrimitive(props: AudioPlaylistTrackImagePrimitiveProps): import("react/jsx-runtime").JSX.Element;
