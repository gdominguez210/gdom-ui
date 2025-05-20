import { PropsWithChildren } from 'react';
export type AudioContextProviderProps = PropsWithChildren & {
    isPlaying?: boolean;
};
/**
 * Provider component that makes audio analysis data available to its children
 */
export declare function AudioContextProvider(props: AudioContextProviderProps): import("react/jsx-runtime").JSX.Element;
