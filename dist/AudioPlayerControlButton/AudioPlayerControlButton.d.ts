import { ComponentPropsWithRef } from 'react';
export type AudioPlayerControlButtonProps = ComponentPropsWithRef<'button'> & {
    active?: boolean;
};
export declare function AudioPlayerControlButton(props: AudioPlayerControlButtonProps): import("react/jsx-runtime").JSX.Element;
