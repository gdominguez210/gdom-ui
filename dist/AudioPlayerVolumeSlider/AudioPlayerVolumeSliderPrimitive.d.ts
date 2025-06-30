import { ComponentPropsWithRef } from 'react';
/**
 * Props for the volume slider primitive component
 */
export type AudioPlayerVolumeSliderPrimitiveProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
    /** Current volume value */
    value: number;
    /** Minimum volume value @default 0 */
    min?: number;
    /** Maximum volume value @default 100 */
    max?: number;
    /** Orientation of the slider @default horizontal */
    orientation?: 'horizontal' | 'vertical';
};
/**
 * Base input range component for volume control
 */
export declare function AudioPlayerVolumeSliderPrimitive(props: AudioPlayerVolumeSliderPrimitiveProps): import("react/jsx-runtime").JSX.Element;
