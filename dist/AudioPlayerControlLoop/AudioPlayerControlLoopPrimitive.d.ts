import { ComponentPropsWithRef } from 'react';
/**
 * Props for the loop button primitive component
 */
export interface AudioPlayerControlLoopPrimitiveProps extends ComponentPropsWithRef<'button'> {
    /** Whether loop mode is currently active */
    active?: boolean;
}
/**
 * Base button component for toggling loop playback mode
 */
export declare function AudioPlayerControlLoopPrimitive(props: AudioPlayerControlLoopPrimitiveProps): import("react/jsx-runtime").JSX.Element;
