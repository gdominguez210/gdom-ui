import { RefObject } from 'react';
export type useAudioPlayerExpandableContainer = {
    isPlaylistVisible: boolean;
    containerRef: RefObject<HTMLElement | null>;
    toggleRef: RefObject<HTMLElement | null>;
    onClose?: () => void;
};
export declare function useAudioPlaylistExpandableContainer(props: useAudioPlayerExpandableContainer): void;
