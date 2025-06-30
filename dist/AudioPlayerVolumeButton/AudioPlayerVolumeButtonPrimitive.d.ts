import { ComponentPropsWithRef } from 'react';
import { VolumeIconName } from '../IconLibrary/data';
export type AudioPlayerVolumeButtonPrimitiveProps = {
    /** Icon name for the volume button */
    iconName: VolumeIconName;
} & ComponentPropsWithRef<'button'>;
/**
 * Base button component for volume controls
 */
export declare function AudioPlayerVolumeButtonPrimitive(props: AudioPlayerVolumeButtonPrimitiveProps): import("react/jsx-runtime").JSX.Element;
