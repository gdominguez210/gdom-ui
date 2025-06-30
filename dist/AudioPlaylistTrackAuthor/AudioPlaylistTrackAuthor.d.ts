import { ElementType } from 'react';
import { AudioPlaylistTrackAuthorPrimitiveProps } from './AudioPlaylistTrackAuthorPrimitive';
/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorProps<T extends ElementType = 'span'> = Omit<AudioPlaylistTrackAuthorPrimitiveProps<T>, 'children'>;
/**
 * Audio playlist track author component
 */
export declare function AudioPlaylistTrackAuthor<T extends ElementType = 'span'>(props: AudioPlaylistTrackAuthorProps<T>): import("react/jsx-runtime").JSX.Element;
