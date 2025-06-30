import { AudioPlaylistTrackTitlePrimitiveProps } from './AudioPlaylistTrackTitlePrimitive';
import { ElementType } from 'react';
export type AudioPlaylistTrackTitleProps<T extends ElementType = 'span'> = Omit<AudioPlaylistTrackTitlePrimitiveProps<T>, 'children'>;
export declare function AudioPlaylistTrackTitle<T extends ElementType = 'span'>(props: AudioPlaylistTrackTitleProps<T>): import("react/jsx-runtime").JSX.Element;
